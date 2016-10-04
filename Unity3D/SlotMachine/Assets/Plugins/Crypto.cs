using System.Collections;
using System.Text;
using System.Security.Cryptography;

using UnityEngine;
using UnityEngine.UI;

using System;
using System.Data;
using System.Threading;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Security;

//namespace easyAES {
	public class Crypto {
			/*public static byte[] encrypt(string toEncrypt, string key) {
				try {
					// 256-AES key
					byte[] keyArray = Encoding.UTF8.GetBytes(key);
					byte[] toEncryptArray = Encoding.UTF8.GetBytes(toEncrypt);
					RijndaelManaged rDel = new RijndaelManaged();
					rDel.Key = keyArray;
					rDel.Mode = CipherMode.ECB;
					rDel.Padding = PaddingMode.ISO10126;
					ICryptoTransform cTransform = rDel.CreateEncryptor();
					return cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
				}
				catch
				{}
				return null;
			}
			
			public static string decrypt(byte[] toEncryptArray, string key) {
				try {
					// AES-256 key
					byte[] keyArray = Encoding.UTF8.GetBytes(key);
					RijndaelManaged rDel = new RijndaelManaged();
					rDel.Key = keyArray;
					rDel.Mode = CipherMode.ECB;
					rDel.Padding = PaddingMode.ISO10126;
					ICryptoTransform cTransform = rDel.CreateDecryptor();
					byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
					//return UTF8Encoding.UTF8.GetString(resultArray);
					return Encoding.UTF8.GetString(resultArray);
				}
				catch
				{}
				return null;
			}*/
			
	static readonly string AES_Key = "PSVJQRk9QTEpNVU1DWUZCRVFGV1VVT0ZOV1RRU1NaWQ="; 						//-piotr
	static readonly string AES_IV =  "YWlFLVEZZUFNaWlhPQ01ZT0lLWU5HTFJQVFNCRUJZVA=";
		


	public static string AES_encrypt(string Input) {
				RijndaelManaged aes = new RijndaelManaged();
					aes.KeySize = 256;
					aes.BlockSize = 256;
					aes.Padding = PaddingMode.PKCS7;   //PKCS7
					aes.Key = Convert.FromBase64String(AES_Key);
					aes.IV = Convert.FromBase64String(AES_IV);
				
				var encrypt = aes.CreateEncryptor(aes.Key, aes.IV);
				byte[] xBuff = null;

				using (var MemoryStream = new MemoryStream()) {
					using (var cs = new CryptoStream(MemoryStream, encrypt, CryptoStreamMode.Write)) {
						byte[] xXml = Encoding.UTF8.GetBytes(Input);
						cs.Write(xXml, 0, xXml.Length);
					}
					
					xBuff = MemoryStream.ToArray();
				}
				
					//Debug.Log (Convert.ToBase64String(xBuff));
				return Convert.ToBase64String(xBuff);
	}
			

	public static string AES_decrypt(string Input) {
				RijndaelManaged aes = new RijndaelManaged();
					aes.KeySize = 256;
					aes.BlockSize = 256;
					aes.Mode = CipherMode.CBC;
					aes.Padding = PaddingMode.PKCS7;
					aes.Key = Convert.FromBase64String(AES_Key);
					aes.IV = Convert.FromBase64String(AES_IV);
				
				var decrypt = aes.CreateDecryptor(aes.Key, aes.IV);
				byte[] xBuff = null;

				using (var MemoryStream = new MemoryStream()) {
					using (var cs = new CryptoStream(MemoryStream, decrypt, CryptoStreamMode.Write)) {
						byte[] xXml = Convert.FromBase64String(Input);
						cs.Write(xXml, 0, xXml.Length);
					}
					
					xBuff = MemoryStream.ToArray();
				}

					//Debug.Log (Encoding.UTF8.GetString(xBuff));
				return Encoding.UTF8.GetString(xBuff);
			}

	}
//}