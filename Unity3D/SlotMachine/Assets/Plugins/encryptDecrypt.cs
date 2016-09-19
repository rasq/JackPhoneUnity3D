using UnityEngine;

using System;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using UnityEngine.UI;
using System.IO;
using System.Security.Cryptography;

public class encryptDecrypt {
	static readonly string PasswordHash = "*-f85wF$YG";
	static readonly string SaltKey = "#43greERGgete53#$ghg_8ok";
	static readonly string VIKey = "qw$554fh/48Oj^7V";



	public static string EncryptString(string plainText){
		byte[] plainTextBytes = Encoding.UTF8.GetBytes (plainText);
		byte[] keyBytes = new Rfc2898DeriveBytes(PasswordHash, Encoding.ASCII.GetBytes(SaltKey)).GetBytes(256 / 8);

		var symetricKey = new RijndaelManaged () {Mode = CipherMode.CBC, Padding = PaddingMode.Zeros};
		var encrypter = symetricKey.CreateEncryptor (keyBytes, Encoding.ASCII.GetBytes (VIKey));

		byte[] cipherTextBytes;
		
		using (var memoryStream = new MemoryStream()) {
			using(var cryptoStream = new CryptoStream(memoryStream, encrypter, CryptoStreamMode.Write)){
				cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
				cryptoStream.FlushFinalBlock();
				cipherTextBytes = memoryStream.ToArray();
				cryptoStream.Close();
			}
			memoryStream.Close();
		}
		return Convert.ToBase64String(cipherTextBytes);
	}
	
	
	public static string DecryptString(string encryptedText){
		byte[] cipherTextBytes = Convert.FromBase64String (encryptedText);
		byte[] keyBytes = new Rfc2898DeriveBytes(PasswordHash, Encoding.ASCII.GetBytes(SaltKey)).GetBytes(256 / 8);
		
		var symetricKey = new RijndaelManaged () {Mode = CipherMode.CBC, Padding = PaddingMode.None};

		var decrypter = symetricKey.CreateDecryptor (keyBytes, Encoding.ASCII.GetBytes (VIKey));
		var memoryStream = new MemoryStream (cipherTextBytes); 
		var cryptoStream = new CryptoStream (memoryStream, decrypter, CryptoStreamMode.Read);
		byte[] plainTextBytes = new byte[cipherTextBytes.Length];
		
		int decryptedByteCount = cryptoStream.Read (plainTextBytes, 0, plainTextBytes.Length);
		memoryStream.Close ();
		cryptoStream.Close ();
		
		return Encoding.UTF8.GetString (plainTextBytes, 0, decryptedByteCount).TrimEnd ("\0".ToCharArray ());
	}
}
