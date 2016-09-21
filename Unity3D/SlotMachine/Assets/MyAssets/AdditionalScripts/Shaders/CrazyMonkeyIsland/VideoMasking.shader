// Shader created with Shader Forge v1.21 
// Shader Forge (c) Neat Corporation / Joachim Holmer - http://www.acegikmo.com/shaderforge/
// Note: Manually altering this data may prevent you from opening it in Shader Forge
Shader "0_CD/VideoMaskedColored" {
	Properties{
		_MainTex("MainTex", 2D) = "white" {}
	_Mask("Mask", 2D) = "white" {}
	_Transparency("Transparency", Range(0, 1)) = 0
		_Color("Color", Color) = (0.4485294,0.310013,0.310013,1)
		[HideInInspector]_Cutoff("Alpha cutoff", Range(0,1)) = 0.5
	}
		SubShader{
		Tags{
		"IgnoreProjector" = "True"
		"Queue" = "Transparent"
		"RenderType" = "Transparent"
	}
		Pass{
		Name "FORWARD"
		Tags{
		"LightMode" = "ForwardBase"
	}
		Blend SrcAlpha OneMinusSrcAlpha
		ZWrite Off

		CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#define UNITY_PASS_FORWARDBASE
#include "UnityCG.cginc"
#include "UnityPBSLighting.cginc"
#include "UnityStandardBRDF.cginc"
#pragma multi_compile_fwdbase
#pragma exclude_renderers gles3 metal d3d11_9x xbox360 xboxone ps3 ps4 psp2 
#pragma target 3.0
		uniform sampler2D _MainTex; uniform float4 _MainTex_ST;
	uniform sampler2D _Mask; uniform float4 _Mask_ST;
	uniform float _Transparency;
	uniform float4 _Color;
	struct VertexInput {
		float4 vertex : POSITION;
		float2 texcoord0 : TEXCOORD0;
	};
	struct VertexOutput {
		float4 pos : SV_POSITION;
		float2 uv0 : TEXCOORD0;
	};
	VertexOutput vert(VertexInput v) {
		VertexOutput o = (VertexOutput)0;
		o.uv0 = v.texcoord0;
		o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
		return o;
	}
	float4 frag(VertexOutput i) : COLOR{
		/////// Vectors:
		////// Lighting:
		////// Emissive:
		float4 _MainTex_var = tex2D(_MainTex,TRANSFORM_TEX(i.uv0, _MainTex));
		float3 emissive = (_Color.rgb*_MainTex_var.rgb);
		float3 finalColor = emissive;
		float4 _Mask_var = tex2D(_Mask,TRANSFORM_TEX(i.uv0, _Mask));
		return fixed4(finalColor,((lerp(lerp(lerp(_Mask_var.b, _Mask_var.r, _Mask_var.rgb.r), _Mask_var.g, _Mask_var.rgb.g), _Mask_var.b, _Mask_var.rgb.b))*_Transparency));
	}
		ENDCG
	}
	}
		FallBack "Diffuse"
		CustomEditor "ShaderForgeMaterialInspector"
}