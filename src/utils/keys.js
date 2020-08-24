import * as ethUtil from "ethereumjs-util";
import scrypt from "scryptsy";
import crypto from "crypto";
import { Transaction } from "ethereumjs-tx";
import ENV from "src/configs/env";

function decipherBuffer(decipher, data) {
  return Buffer.concat([decipher.update(data), decipher.final()]);
}

export function addressFromKey(keystring) {
  try {
    const keyObj = JSON.parse(keystring);
    const address = keyObj.address;

    if (address === undefined || address === "") {
      throw new Error("Invalid keystore format");
    }

    return "0x" + address;
  } catch (e) {
    throw new Error("Invalid keystore format");
  }
}

export function unlock(input, password, nonStrict) {
  const json = typeof input === "object" ? input : JSON.parse(nonStrict ? input.toLowerCase() : input);

  if (json.version !== 3) {
    throw new Error("Not a V3 wallet");
  }

  let derivedKey, kdfparams;

  if (json.crypto.kdf === "scrypt") {
    kdfparams = json.crypto.kdfparams;
    derivedKey = scrypt(
      new Buffer(password),
      new Buffer(kdfparams.salt, "hex"),
      kdfparams.n,
      kdfparams.r,
      kdfparams.p,
      kdfparams.dklen
    );
  } else if (json.crypto.kdf === "pbkdf2") {
    kdfparams = json.crypto.kdfparams;
    if (kdfparams.prf !== "hmac-sha256") {
      throw new Error("Unsupported parameters to PBKDF2");
    }
    derivedKey = crypto.pbkdf2Sync(
      new Buffer(password),
      new Buffer(kdfparams.salt, "hex"),
      kdfparams.c,
      kdfparams.dklen,
      "sha256"
    );
  } else {
    throw new Error("Unsupported key derivation scheme");
  }

  const ciphertext = new Buffer(json.crypto.ciphertext, "hex");
  const mac = ethUtil.keccak(Buffer.concat([derivedKey.slice(16, 32), ciphertext]));

  if (mac.toString("hex") !== json.crypto.mac) {
    throw new Error("Key derivation failed - possibly wrong password");
  }

  const decipher = crypto.createDecipheriv(
    json.crypto.cipher,
    derivedKey.slice(0, 16),
    new Buffer(json.crypto.cipherparams.iv, "hex")
  );

  let seed = decipherBuffer(decipher, ciphertext, "hex");

  while (seed.length < 32) {
    const nullBuff = new Buffer([0x00]);
    seed = Buffer.concat([nullBuff, seed]);
  }

  return seed;
}

export function getRawTxHex(txObject) {
  const tx = new Transaction(txObject, { chain: ENV.CHAIN_NAME });

  tx.raw[6] = ENV.NETWORK_ID;
  tx.raw[7] = Buffer.from([]);
  tx.raw[8] = Buffer.from([]);

  return tx.serialize().toString('hex');
}

export function getSignedTxHex(txObject, signature, calculateV = false) {
  let v = signature.v;
  let r = signature.r;
  let s = signature.s;

  if (calculateV) {
    v = `0x${reCalculateSignatureV(v)}`;
    r = `0x${r}`;
    s = `0x${s}`;
  }

  const signedTxObject = {
    ...txObject, v, r, s,
  };

  const signedTx = new Transaction(signedTxObject, { chain: ENV.CHAIN_NAME });

  return `0x${signedTx.serialize().toString('hex')}`;
}

function reCalculateSignatureV(v) {
  const rv = parseInt(v, 16);
  let cv = ENV.NETWORK_ID * 2 + 35;

  if (rv !== cv && (rv & cv) !== rv) {
    cv += 1;
  }

  return cv.toString(16);
}
