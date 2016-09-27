using UnityEngine;
using UnityEngine.UI;

using System;
using System.Data;
using System.Text;
using System.Threading;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Security;
using System.Security.Cryptography;

public class encryptDecrypt {
	
	/************************************************************************3DES***********************************************************************************************/
	/*static readonly string PasswordHash = "*-f85wF$YG";
	static readonly string SaltKey = "#43greERGgete53#$ghg_8ok"; 						-michal
	static readonly string VIKey = "qw$554fh/48Oj^7V";
*/
	static readonly string PasswordHash = "*-f85wF$YG";
	static readonly string SaltKey = "E4HD9h4DhS23DYfhHemkS3Nf"; 						//-piotr
	static readonly string VIKey = "fYfhHeDmfYfhHeDm";


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
	/************************************************************************3DES***********************************************************************************************/
}
