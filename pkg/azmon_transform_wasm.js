let wasm;

let heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    }
}

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}
/**
 * @param {string} dcr_json
 * @returns {string}
 */
export function validate(dcr_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(dcr_json, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        wasm.validate(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export_2(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @returns {string}
 */
export function get_metadata() {
    let deferred1_0;
    let deferred1_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.get_metadata(retptr);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred1_0 = r0;
        deferred1_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export_2(deferred1_0, deferred1_1, 1);
    }
}

const EXPECTED_RESPONSE_TYPES = new Set(['basic', 'cors', 'default']);

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_log_6c7b5f4f00b8ce3f = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbg_wbindgenthrow_451ec1a8469d7eb6 = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(arg0, arg1) {
        // Cast intrinsic for `Ref(String) -> Externref`.
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;



    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('azmon_transform_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;

// SIG // Begin signature block
// SIG // MIIsCgYJKoZIhvcNAQcCoIIr+zCCK/cCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // d5aDt5BaJPz+hLfidTUs9LKTji4WLMNeyiKph3ASWy6g
// SIG // ghF9MIIIjTCCB3WgAwIBAgITNgAAAg55l6Dp/V+f0wAC
// SIG // AAACDjANBgkqhkiG9w0BAQsFADBBMRMwEQYKCZImiZPy
// SIG // LGQBGRYDR0JMMRMwEQYKCZImiZPyLGQBGRYDQU1FMRUw
// SIG // EwYDVQQDEwxBTUUgQ1MgQ0EgMDEwHhcNMjUxMDIzMjMx
// SIG // MjAzWhcNMjYwNDI2MjMyMjAzWjAkMSIwIAYDVQQDExlN
// SIG // aWNyb3NvZnQgQXp1cmUgQ29kZSBTaWduMIIBIjANBgkq
// SIG // hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn68PZm44UaQs
// SIG // 9FofnZllOJ5QW3og5JeTXzVhQPTVlAHw3EgBLVoiU2Sy
// SIG // AVbfhOZI6cUHwnjm3cZNGmjypoZADZWuZCeXoI5q7bZh
// SIG // r7CP0j3nkPPdI/0DuGCOIEFqV57fBLMLVusc5kXTDD/g
// SIG // gEsgGCdKFkDFV1zDYQRvVQXa2Xvi9fg8y2sKuNgFhjaC
// SIG // i+iXRoNtT9FtdTDdTrcK4bm4E6hAZIGKe5tQbeBHjsQc
// SIG // 9BsGXzzg2y1U25QAki5hpXxHjxHVWpqiFE03bKwChvDT
// SIG // P4BsdNdAIqgL+qdrArUnmab1e35KaS2PWo3ZvGHOCn9S
// SIG // jSN1OWTTHSyA8/XwOUPrpQIDAQABo4IFmTCCBZUwKQYJ
// SIG // KwYBBAGCNxUKBBwwGjAMBgorBgEEAYI3WwEBMAoGCCsG
// SIG // AQUFBwMDMD0GCSsGAQQBgjcVBwQwMC4GJisGAQQBgjcV
// SIG // CIaQ4w2E1bR4hPGLPoWb3RbOnRKBYIPdzWaGlIwyAgFk
// SIG // AgEOMIICdgYIKwYBBQUHAQEEggJoMIICZDBiBggrBgEF
// SIG // BQcwAoZWaHR0cDovL2NybC5taWNyb3NvZnQuY29tL3Br
// SIG // aWluZnJhL0NlcnRzL0JZMlBLSUNTQ0EwMS5BTUUuR0JM
// SIG // X0FNRSUyMENTJTIwQ0ElMjAwMSgyKS5jcnQwUgYIKwYB
// SIG // BQUHMAKGRmh0dHA6Ly9jcmwxLmFtZS5nYmwvYWlhL0JZ
// SIG // MlBLSUNTQ0EwMS5BTUUuR0JMX0FNRSUyMENTJTIwQ0El
// SIG // MjAwMSgyKS5jcnQwUgYIKwYBBQUHMAKGRmh0dHA6Ly9j
// SIG // cmwyLmFtZS5nYmwvYWlhL0JZMlBLSUNTQ0EwMS5BTUUu
// SIG // R0JMX0FNRSUyMENTJTIwQ0ElMjAwMSgyKS5jcnQwUgYI
// SIG // KwYBBQUHMAKGRmh0dHA6Ly9jcmwzLmFtZS5nYmwvYWlh
// SIG // L0JZMlBLSUNTQ0EwMS5BTUUuR0JMX0FNRSUyMENTJTIw
// SIG // Q0ElMjAwMSgyKS5jcnQwUgYIKwYBBQUHMAKGRmh0dHA6
// SIG // Ly9jcmw0LmFtZS5nYmwvYWlhL0JZMlBLSUNTQ0EwMS5B
// SIG // TUUuR0JMX0FNRSUyMENTJTIwQ0ElMjAwMSgyKS5jcnQw
// SIG // ga0GCCsGAQUFBzAChoGgbGRhcDovLy9DTj1BTUUlMjBD
// SIG // UyUyMENBJTIwMDEsQ049QUlBLENOPVB1YmxpYyUyMEtl
// SIG // eSUyMFNlcnZpY2VzLENOPVNlcnZpY2VzLENOPUNvbmZp
// SIG // Z3VyYXRpb24sREM9QU1FLERDPUdCTD9jQUNlcnRpZmlj
// SIG // YXRlP2Jhc2U/b2JqZWN0Q2xhc3M9Y2VydGlmaWNhdGlv
// SIG // bkF1dGhvcml0eTAdBgNVHQ4EFgQUmyia4LlYRWoI9bUm
// SIG // 8xZ7RxrboAkwDgYDVR0PAQH/BAQDAgeAMFQGA1UdEQRN
// SIG // MEukSTBHMS0wKwYDVQQLEyRNaWNyb3NvZnQgSXJlbGFu
// SIG // ZCBPcGVyYXRpb25zIExpbWl0ZWQxFjAUBgNVBAUTDTIz
// SIG // NjE2Nys1MDYwNTIwggHmBgNVHR8EggHdMIIB2TCCAdWg
// SIG // ggHRoIIBzYY/aHR0cDovL2NybC5taWNyb3NvZnQuY29t
// SIG // L3BraWluZnJhL0NSTC9BTUUlMjBDUyUyMENBJTIwMDEo
// SIG // MikuY3JshjFodHRwOi8vY3JsMS5hbWUuZ2JsL2NybC9B
// SIG // TUUlMjBDUyUyMENBJTIwMDEoMikuY3JshjFodHRwOi8v
// SIG // Y3JsMi5hbWUuZ2JsL2NybC9BTUUlMjBDUyUyMENBJTIw
// SIG // MDEoMikuY3JshjFodHRwOi8vY3JsMy5hbWUuZ2JsL2Ny
// SIG // bC9BTUUlMjBDUyUyMENBJTIwMDEoMikuY3JshjFodHRw
// SIG // Oi8vY3JsNC5hbWUuZ2JsL2NybC9BTUUlMjBDUyUyMENB
// SIG // JTIwMDEoMikuY3JshoG9bGRhcDovLy9DTj1BTUUlMjBD
// SIG // UyUyMENBJTIwMDEoMiksQ049QlkyUEtJQ1NDQTAxLENO
// SIG // PUNEUCxDTj1QdWJsaWMlMjBLZXklMjBTZXJ2aWNlcyxD
// SIG // Tj1TZXJ2aWNlcyxDTj1Db25maWd1cmF0aW9uLERDPUFN
// SIG // RSxEQz1HQkw/Y2VydGlmaWNhdGVSZXZvY2F0aW9uTGlz
// SIG // dD9iYXNlP29iamVjdENsYXNzPWNSTERpc3RyaWJ1dGlv
// SIG // blBvaW50MB8GA1UdIwQYMBaAFJZRhOBrb3v+2Aarw/KF
// SIG // 5imuavnUMB8GA1UdJQQYMBYGCisGAQQBgjdbAQEGCCsG
// SIG // AQUFBwMDMA0GCSqGSIb3DQEBCwUAA4IBAQCmgYfwfONl
// SIG // DxajRz/ptpmEmPNKKyoz1Z1xG/ipQqMS9SJJdg384hNT
// SIG // wWV7Qg22Lb8jKgvT4yrwfEzc+9fglqztJaldn9CiEzJr
// SIG // V4gsvsk4Qai2L1Ga260c5V2L9pUJqljMtDqqykyHTM2t
// SIG // osFKdoHS5ysxuw0PCHG4LmF8MIfhs23lI2PYRIu7F+3Y
// SIG // FT+C7NVEDZEakRXETzgKEwWbwRoT0pDgJ5fQkobwh3yq
// SIG // x5dMswZP5P5Z7eA4ugOsFquBMNQb3h1zB9WU/rHUbopJ
// SIG // uWCy6i3Px4aIk964neRB1UCt7J4PeXyHQTII9ukknDL8
// SIG // iljQvYCpKXpns1EjP3PdcBIcMIII6DCCBtCgAwIBAgIT
// SIG // HwAAAFHqj/accwyoOwAAAAAAUTANBgkqhkiG9w0BAQsF
// SIG // ADA8MRMwEQYKCZImiZPyLGQBGRYDR0JMMRMwEQYKCZIm
// SIG // iZPyLGQBGRYDQU1FMRAwDgYDVQQDEwdhbWVyb290MB4X
// SIG // DTIxMDUyMTE4NDQxNFoXDTI2MDUyMTE4NTQxNFowQTET
// SIG // MBEGCgmSJomT8ixkARkWA0dCTDETMBEGCgmSJomT8ixk
// SIG // ARkWA0FNRTEVMBMGA1UEAxMMQU1FIENTIENBIDAxMIIB
// SIG // IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyZpS
// SIG // CX0Bno1W1yqXMhT6BUlJZWpa4p3xFeiTHO4vm2Q6C/az
// SIG // R5xwxnyYHrkSGDtS2P9X+KDE64V20mmEQkubxnPNeOVn
// SIG // E2RvdPGxgwlq+BhS3ONdVsQPj79q7XgHM9HhzB9+qk0P
// SIG // C9KN1zm9p/seyiRS6JF1dbOqRf1pUl7FAVxmgiCFgV8h
// SIG // HIb/rDPXig7FDi3S0yEx2CUDVpIq8jEhG8anUFE1WYxM
// SIG // +ni0S5KHwwKPKV4qyGDoDO+9AmDoma3Chyu5WDlW5cdt
// SIG // qXTWsGPE3umtnX6AmlldUFLms4OVR4guKf+n5LIBCC6b
// SIG // TiocfXPomqYjYTKx7AGMfaVLaaXmhQIDAQABo4IE3DCC
// SIG // BNgwEgYJKwYBBAGCNxUBBAUCAwIAAjAjBgkrBgEEAYI3
// SIG // FQIEFgQUEmgkQiFHy9RrvjHPIKTACyN/P0cwHQYDVR0O
// SIG // BBYEFJZRhOBrb3v+2Aarw/KF5imuavnUMIIBBAYDVR0l
// SIG // BIH8MIH5BgcrBgEFAgMFBggrBgEFBQcDAQYIKwYBBQUH
// SIG // AwIGCisGAQQBgjcUAgEGCSsGAQQBgjcVBgYKKwYBBAGC
// SIG // NwoDDAYJKwYBBAGCNxUGBggrBgEFBQcDCQYIKwYBBQUI
// SIG // AgIGCisGAQQBgjdAAQEGCysGAQQBgjcKAwQBBgorBgEE
// SIG // AYI3CgMEBgkrBgEEAYI3FQUGCisGAQQBgjcUAgIGCisG
// SIG // AQQBgjcUAgMGCCsGAQUFBwMDBgorBgEEAYI3WwEBBgor
// SIG // BgEEAYI3WwIBBgorBgEEAYI3WwMBBgorBgEEAYI3WwUB
// SIG // BgorBgEEAYI3WwQBBgorBgEEAYI3WwQCMBkGCSsGAQQB
// SIG // gjcUAgQMHgoAUwB1AGIAQwBBMAsGA1UdDwQEAwIBhjAS
// SIG // BgNVHRMBAf8ECDAGAQH/AgEAMB8GA1UdIwQYMBaAFCle
// SIG // UV5krjS566ycDaeMdQHRCQsoMIIBaAYDVR0fBIIBXzCC
// SIG // AVswggFXoIIBU6CCAU+GMWh0dHA6Ly9jcmwubWljcm9z
// SIG // b2Z0LmNvbS9wa2lpbmZyYS9jcmwvYW1lcm9vdC5jcmyG
// SIG // I2h0dHA6Ly9jcmwyLmFtZS5nYmwvY3JsL2FtZXJvb3Qu
// SIG // Y3JshiNodHRwOi8vY3JsMy5hbWUuZ2JsL2NybC9hbWVy
// SIG // b290LmNybIYjaHR0cDovL2NybDEuYW1lLmdibC9jcmwv
// SIG // YW1lcm9vdC5jcmyGgapsZGFwOi8vL0NOPWFtZXJvb3Qs
// SIG // Q049QU1FUm9vdCxDTj1DRFAsQ049UHVibGljJTIwS2V5
// SIG // JTIwU2VydmljZXMsQ049U2VydmljZXMsQ049Q29uZmln
// SIG // dXJhdGlvbixEQz1BTUUsREM9R0JMP2NlcnRpZmljYXRl
// SIG // UmV2b2NhdGlvbkxpc3Q/YmFzZT9vYmplY3RDbGFzcz1j
// SIG // UkxEaXN0cmlidXRpb25Qb2ludDCCAasGCCsGAQUFBwEB
// SIG // BIIBnTCCAZkwRwYIKwYBBQUHMAKGO2h0dHA6Ly9jcmwu
// SIG // bWljcm9zb2Z0LmNvbS9wa2lpbmZyYS9jZXJ0cy9BTUVS
// SIG // b290X2FtZXJvb3QuY3J0MDcGCCsGAQUFBzAChitodHRw
// SIG // Oi8vY3JsMi5hbWUuZ2JsL2FpYS9BTUVSb290X2FtZXJv
// SIG // b3QuY3J0MDcGCCsGAQUFBzAChitodHRwOi8vY3JsMy5h
// SIG // bWUuZ2JsL2FpYS9BTUVSb290X2FtZXJvb3QuY3J0MDcG
// SIG // CCsGAQUFBzAChitodHRwOi8vY3JsMS5hbWUuZ2JsL2Fp
// SIG // YS9BTUVSb290X2FtZXJvb3QuY3J0MIGiBggrBgEFBQcw
// SIG // AoaBlWxkYXA6Ly8vQ049YW1lcm9vdCxDTj1BSUEsQ049
// SIG // UHVibGljJTIwS2V5JTIwU2VydmljZXMsQ049U2Vydmlj
// SIG // ZXMsQ049Q29uZmlndXJhdGlvbixEQz1BTUUsREM9R0JM
// SIG // P2NBQ2VydGlmaWNhdGU/YmFzZT9vYmplY3RDbGFzcz1j
// SIG // ZXJ0aWZpY2F0aW9uQXV0aG9yaXR5MA0GCSqGSIb3DQEB
// SIG // CwUAA4ICAQBQECO3Tw/o317Rrd7yadqcswPx1LvIYymk
// SIG // aTN6KcmuRt6HKa0Xe73Ux2/AQ30TfgA9GBJngweRykKB
// SIG // usRzyOU17iIubJvy3gA21dwtqtB0DsoEv1U/ptVu2v++
// SIG // doTCJ/i+GbssVXkgaX8H+6EOGEmT4evp4GbwR4HwWlc+
// SIG // Dvf8HH8PdUA2Z04CvcwIfckSipbNm84jxJ8XjmTFTWsc
// SIG // ldL9edj2NsY6iGnyJFIyur2PS7VRYyV3p1VAJp91gj1j
// SIG // RQtWEyCB8P5g9nE3z8u0ANaU/hjwEQCrdGyravWgnf2J
// SIG // tG+bT26YAokbc8m+32zUtXRO+NK3tAjhOu2FdsG3qNrF
// SIG // 4sc7y37R/C+7Pcb/cFfhttqsirepZii4xStcjMODYuXz
// SIG // Gm3IJs0b0owHG6oKd7ZOGvHpmmh9K8/DLriD/sq8bURD
// SIG // 10qi/wuW8zM7IpLg1vcR9dIK2mc0pj44pc6UX0XbttP/
// SIG // VEJgu3lT2eI9VjWtaKjx38xE9woSMyekPRtzTwgfuysF
// SIG // 9DkJisr+yA4po/FPxpbBw9c/hBf32DH/GFxteS2pmjgK
// SIG // IbMP8sDukmEq3lVvuWNJsybrZwQvQpvaM49fv+JKpLK5
// SIG // YWYEfwksYRR9wU8Hh/ID9hRCEkbUoQ2W7mMpsp2Nbp/k
// SIG // cn4ivfolUy3Q9Yf0scsQ6WTLYpm+AoCUJTGCGeUwghnh
// SIG // AgEBMFgwQTETMBEGCgmSJomT8ixkARkWA0dCTDETMBEG
// SIG // CgmSJomT8ixkARkWA0FNRTEVMBMGA1UEAxMMQU1FIENT
// SIG // IENBIDAxAhM2AAACDnmXoOn9X5/TAAIAAAIOMA0GCWCG
// SIG // SAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgorBgEE
// SIG // AYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEEAYI3
// SIG // AgEVMC8GCSqGSIb3DQEJBDEiBCDKTqwYJXP5kiRF5J6d
// SIG // X08OggXiyXen11HsRjZwGu6pFDBCBgorBgEEAYI3AgEM
// SIG // MTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAYaHR0
// SIG // cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3DQEB
// SIG // AQUABIIBAGqsICOpHo1e728ZaJpGraYfT7DNafTfhLjE
// SIG // bnP4/llG/9PLZfbfWlxJzMD2bzWD8NcJlhm0qejeIje6
// SIG // NjP1yX5y3OAu70yr69ANMO7RP6LOgvuigSXpbCj9Knrr
// SIG // mEFSrMAqFJEfRFwzskidg+iDYqhwImXmE4uB4EHvZGrF
// SIG // YWtuY/BEd9AwFMcL9oD7F6+Ub3cZD3S/6chFn6dEe84j
// SIG // wuDXZSIIE+I7QBUlOuzBwy4iykz6RKRrPYCFBZ70WUEk
// SIG // /gpUH/6foeHhoheKLd5fLwyRejzZfSvCwpQro0oysXZu
// SIG // jnj0QNlNQ5AmDi09wDqdiuPPS7mBIzdBO6qc1fLzbyGh
// SIG // ghetMIIXqQYKKwYBBAGCNwMDATGCF5kwgheVBgkqhkiG
// SIG // 9w0BBwKggheGMIIXggIBAzEPMA0GCWCGSAFlAwQCAQUA
// SIG // MIIBWgYLKoZIhvcNAQkQAQSgggFJBIIBRTCCAUECAQEG
// SIG // CisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQglTwH
// SIG // 9zWYfUMELfSTmQgxzZZNEJbiyM3vAPZzq2LUj/sCBmlD
// SIG // FcpMThgTMjAyNTEyMjIyMDA2MDMuNzE0WjAEgAIB9KCB
// SIG // 2aSB1jCB0zELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEtMCsGA1UE
// SIG // CxMkTWljcm9zb2Z0IElyZWxhbmQgT3BlcmF0aW9ucyBM
// SIG // aW1pdGVkMScwJQYDVQQLEx5uU2hpZWxkIFRTUyBFU046
// SIG // NDAxQS0wNUUwLUQ5NDcxJTAjBgNVBAMTHE1pY3Jvc29m
// SIG // dCBUaW1lLVN0YW1wIFNlcnZpY2WgghH7MIIHKDCCBRCg
// SIG // AwIBAgITMwAAAhlesthUdfSxjQABAAACGTANBgkqhkiG
// SIG // 9w0BAQsFADB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
// SIG // VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAx
// SIG // MDAeFw0yNTA4MTQxODQ4MjZaFw0yNjExMTMxODQ4MjZa
// SIG // MIHTMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYDVQQLEyRN
// SIG // aWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0
// SIG // ZWQxJzAlBgNVBAsTHm5TaGllbGQgVFNTIEVTTjo0MDFB
// SIG // LTA1RTAtRDk0NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgU2VydmljZTCCAiIwDQYJKoZIhvcNAQEB
// SIG // BQADggIPADCCAgoCggIBAKahSMlJMyMsaS90NN1pi7su
// SIG // BvWCFEnM54Sq/nBzk/v7uz2q8SPeoMcW9Vq1rgMQfKox
// SIG // i37GyJsfFd6LitZ1HH/kf57J12rOf4k4Ff05d0E0Rk9A
// SIG // 3rlwTW6R6nPsAtTYk8gO+oC54q70gRKAc5a6TUBRJ7sH
// SIG // Wzywi6U0tylkgruSdNm/kRVkf5HBc1cZ4aBN4CGnlEba
// SIG // xihgWRiiwV76oIJAxDbSpL7b0U99sS7wLy/0aUXruc9f
// SIG // GaIwrO9mUqGu+A8vGG2lrA5tzmTqSUWcWbDygh2esTao
// SIG // BSn9MTR49Lfb9EN1vts+YAFWmrCSQr0edkpdFydgDn95
// SIG // dC0nrV4FAOYA+SENUbxLJU5jZ0qLk6xiA9w9Z42O5gbt
// SIG // KboiHTytoyv9Vnnn9vmEeHEKVkJHgWZl4nYfQLlnZcMS
// SIG // kC9eSyeitncPMv7fzwYZi8rekAH9AnqVkXYGZzMrVQFL
// SIG // lh8JWUVfSS2O2l/A+eXi/fnDi6V92xjTpjduFKSFvKrW
// SIG // Wql2nrBbyDlttyTS4WmkFbzm69XruxhP+TJ+N3vvw27X
// SIG // WJf2yz9iENcWBCXUm3FJAxX1typWRIfpwSg7WkZzUZG4
// SIG // CIMSGynU9/DikMGf2gOLkrIgIOpxD4lgRxrsrSKOcFO+
// SIG // TOVXY4RKqkx312LvASYuhk871k/vXpHzF3s6gpJLMWhv
// SIG // AgMBAAGjggFJMIIBRTAdBgNVHQ4EFgQUgGjqOR1mrTc6
// SIG // mZ9SBdX3A+p69yEwHwYDVR0jBBgwFoAUn6cVXQBeYl2D
// SIG // 9OXSZacbUzUZ6XIwXwYDVR0fBFgwVjBUoFKgUIZOaHR0
// SIG // cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwv
// SIG // TWljcm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIw
// SIG // MTAoMSkuY3JsMGwGCCsGAQUFBwEBBGAwXjBcBggrBgEF
// SIG // BQcwAoZQaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3Br
// SIG // aW9wcy9jZXJ0cy9NaWNyb3NvZnQlMjBUaW1lLVN0YW1w
// SIG // JTIwUENBJTIwMjAxMCgxKS5jcnQwDAYDVR0TAQH/BAIw
// SIG // ADAWBgNVHSUBAf8EDDAKBggrBgEFBQcDCDAOBgNVHQ8B
// SIG // Af8EBAMCB4AwDQYJKoZIhvcNAQELBQADggIBAF8c1WSy
// SIG // 1wRX6Aggk4mOzB13W+3IryUk36x2CQuTpNjTe+Tac0zE
// SIG // /Vdk3CEI30NwBVG4dTQQGLTFLsMQug+HHhFxuZVwJ275
// SIG // AvWI3i1Q0ciJl2GJn7e8/kKZfbdwv/GtLYqpzs/FHvPw
// SIG // 2C7TE4L1jJ7KizYyCw2iJjn5xyN+kywoxhXvEWC1xnQl
// SIG // HTi5XwHTBnj8UkwN0wADnPhkG5j1o64Li1m8b55dzVY0
// SIG // b6wWVZMRTKFWR9H+6hsAzkoY6Z7+Z2J0OPLny9Lgc+dk
// SIG // WzxnV+Bb/flBjqwaa5nB85iLrRbSXnNmOJLozbUytsAR
// SIG // oFrHBDlYRYmlXY3vFSyezFTShOU5rLhjN40y69Z7keQB
// SIG // RrN1CpD+4N3EA+HByu13S4k5u3utOkCflqnkLAA2BPXb
// SIG // 1PcCFGyPQ5eFHCBKxcPhR2lkk65HyeEry5oSp5eZIYaS
// SIG // dbBd8+ntQcXqVJYlx6s0S4h1ooViFhEhfCBxJRdzzsWz
// SIG // +FSahwYmL2lzFdEskYMKA+s13XW1J1/VkeiS9gZagI4x
// SIG // 8SDcHpbKf1YcQFk4c7jAOfC8bxP1QM43xReFpu2tWQC5
// SIG // iVcN6C/7P7saNTqeLXE/oX2fbjdYbQtSTeA7kahXy7bY
// SIG // 7qAJlEKGzuc1BUc7wp/ApP4Yjvm80debKpI5cSzMjI6Z
// SIG // HP3n+ElFIpA+OvL1MIIHcTCCBVmgAwIBAgITMwAAABXF
// SIG // 52ueAptJmQAAAAAAFTANBgkqhkiG9w0BAQsFADCBiDEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjEyMDAGA1UEAxMpTWljcm9z
// SIG // b2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IDIw
// SIG // MTAwHhcNMjEwOTMwMTgyMjI1WhcNMzAwOTMwMTgzMjI1
// SIG // WjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDCCAiIw
// SIG // DQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAOThpkzn
// SIG // tHIhC3miy9ckeb0O1YLT/e6cBwfSqWxOdcjKNVf2AX9s
// SIG // SuDivbk+F2Az/1xPx2b3lVNxWuJ+Slr+uDZnhUYjDLWN
// SIG // E893MsAQGOhgfWpSg0S3po5GawcU88V29YZQ3MFEyHFc
// SIG // UTE3oAo4bo3t1w/YJlN8OWECesSq/XJprx2rrPY2vjUm
// SIG // ZNqYO7oaezOtgFt+jBAcnVL+tuhiJdxqD89d9P6OU8/W
// SIG // 7IVWTe/dvI2k45GPsjksUZzpcGkNyjYtcI4xyDUoveO0
// SIG // hyTD4MmPfrVUj9z6BVWYbWg7mka97aSueik3rMvrg0Xn
// SIG // Rm7KMtXAhjBcTyziYrLNueKNiOSWrAFKu75xqRdbZ2De
// SIG // +JKRHh09/SDPc31BmkZ1zcRfNN0Sidb9pSB9fvzZnkXf
// SIG // tnIv231fgLrbqn427DZM9ituqBJR6L8FA6PRc6ZNN3SU
// SIG // HDSCD/AQ8rdHGO2n6Jl8P0zbr17C89XYcz1DTsEzOUyO
// SIG // ArxCaC4Q6oRRRuLRvWoYWmEBc8pnol7XKHYC4jMYcten
// SIG // IPDC+hIK12NvDMk2ZItboKaDIV1fMHSRlJTYuVD5C4lh
// SIG // 8zYGNRiER9vcG9H9stQcxWv2XFJRXRLbJbqvUAV6bMUR
// SIG // HXLvjflSxIUXk8A8FdsaN8cIFRg/eKtFtvUeh17aj54W
// SIG // cmnGrnu3tz5q4i6tAgMBAAGjggHdMIIB2TASBgkrBgEE
// SIG // AYI3FQEEBQIDAQABMCMGCSsGAQQBgjcVAgQWBBQqp1L+
// SIG // ZMSavoKRPEY1Kc8Q/y8E7jAdBgNVHQ4EFgQUn6cVXQBe
// SIG // Yl2D9OXSZacbUzUZ6XIwXAYDVR0gBFUwUzBRBgwrBgEE
// SIG // AYI3TIN9AQEwQTA/BggrBgEFBQcCARYzaHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraW9wcy9Eb2NzL1JlcG9z
// SIG // aXRvcnkuaHRtMBMGA1UdJQQMMAoGCCsGAQUFBwMIMBkG
// SIG // CSsGAQQBgjcUAgQMHgoAUwB1AGIAQwBBMAsGA1UdDwQE
// SIG // AwIBhjAPBgNVHRMBAf8EBTADAQH/MB8GA1UdIwQYMBaA
// SIG // FNX2VsuP6KJcYmjRPZSQW9fOmhjEMFYGA1UdHwRPME0w
// SIG // S6BJoEeGRWh0dHA6Ly9jcmwubWljcm9zb2Z0LmNvbS9w
// SIG // a2kvY3JsL3Byb2R1Y3RzL01pY1Jvb0NlckF1dF8yMDEw
// SIG // LTA2LTIzLmNybDBaBggrBgEFBQcBAQROMEwwSgYIKwYB
// SIG // BQUHMAKGPmh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2kvY2VydHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMu
// SIG // Y3J0MA0GCSqGSIb3DQEBCwUAA4ICAQCdVX38Kq3hLB9n
// SIG // ATEkW+Geckv8qW/qXBS2Pk5HZHixBpOXPTEztTnXwnE2
// SIG // P9pkbHzQdTltuw8x5MKP+2zRoZQYIu7pZmc6U03dmLq2
// SIG // HnjYNi6cqYJWAAOwBb6J6Gngugnue99qb74py27YP0h1
// SIG // AdkY3m2CDPVtI1TkeFN1JFe53Z/zjj3G82jfZfakVqr3
// SIG // lbYoVSfQJL1AoL8ZthISEV09J+BAljis9/kpicO8F7BU
// SIG // hUKz/AyeixmJ5/ALaoHCgRlCGVJ1ijbCHcNhcy4sa3tu
// SIG // PywJeBTpkbKpW99Jo3QMvOyRgNI95ko+ZjtPu4b6MhrZ
// SIG // lvSP9pEB9s7GdP32THJvEKt1MMU0sHrYUP4KWN1APMdU
// SIG // bZ1jdEgssU5HLcEUBHG/ZPkkvnNtyo4JvbMBV0lUZNlz
// SIG // 138eW0QBjloZkWsNn6Qo3GcZKCS6OEuabvshVGtqRRFH
// SIG // qfG3rsjoiV5PndLQTHa1V1QJsWkBRH58oWFsc/4Ku+xB
// SIG // Zj1p/cvBQUl+fpO+y/g75LcVv7TOPqUxUYS8vwLBgqJ7
// SIG // Fx0ViY1w/ue10CgaiQuPNtq6TPmb/wrpNPgkNWcr4A24
// SIG // 5oyZ1uEi6vAnQj0llOZ0dFtq0Z4+7X6gMTN9vMvpe784
// SIG // cETRkPHIqzqKOghif9lwY1NNje6CbaUFEMFxBmoQtB1V
// SIG // M1izoXBm8qGCA1YwggI+AgEBMIIBAaGB2aSB1jCB0zEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjEtMCsGA1UECxMkTWljcm9z
// SIG // b2Z0IElyZWxhbmQgT3BlcmF0aW9ucyBMaW1pdGVkMScw
// SIG // JQYDVQQLEx5uU2hpZWxkIFRTUyBFU046NDAxQS0wNUUw
// SIG // LUQ5NDcxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFNlcnZpY2WiIwoBATAHBgUrDgMCGgMVADF2Kf1q
// SIG // qncm9Hp4oKy38ZdCJwM+oIGDMIGApH4wfDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgUENBIDIwMTAwDQYJKoZIhvcNAQELBQAC
// SIG // BQDs84LMMCIYDzIwMjUxMjIyMDg0MTQ4WhgPMjAyNTEy
// SIG // MjMwODQxNDhaMHQwOgYKKwYBBAGEWQoEATEsMCowCgIF
// SIG // AOzzgswCAQAwBwIBAAICF0YwBwIBAAICGMgwCgIFAOz0
// SIG // 1EwCAQAwNgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGE
// SIG // WQoDAqAKMAgCAQACAwehIKEKMAgCAQACAwGGoDANBgkq
// SIG // hkiG9w0BAQsFAAOCAQEAOL78VnljE0YdY5pGBsWUtwp9
// SIG // RTSELnOZAzFs2moj+y3eTeeqgslaR73844Ook5QDiiaY
// SIG // ZLH1X+dtGDkYneka1V+bdl1u1ycGAYJUFK5+jEMFcvGi
// SIG // ZeAkPD1YAnAormo/sFntB2sGshjuSYMfO4g02DFPSh7k
// SIG // jXAHPkpPqnHaJhbbQPN73d6MKB1/CA7wsBQer70mMN9O
// SIG // 66fv0LgfPJkuosz4HpDi2XX6KvvWjUZj0mcELRGI4YVh
// SIG // tYN4tMz9hh8MyagAydbrrEaf2RiNeGqliRNlBlIYfzeN
// SIG // /HUBnJimiHUlTt0MZBmML3bGw6we5fBwRBNvGpyryd2d
// SIG // a47EnLVTGTGCBA0wggQJAgEBMIGTMHwxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFBDQSAyMDEwAhMzAAACGV6y2FR19LGNAAEA
// SIG // AAIZMA0GCWCGSAFlAwQCAQUAoIIBSjAaBgkqhkiG9w0B
// SIG // CQMxDQYLKoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkEMSIE
// SIG // IAJabCgXjqh/Bp0vcOaibgIIGpojGSdb+EiOukDuVKUY
// SIG // MIH6BgsqhkiG9w0BCRACLzGB6jCB5zCB5DCBvQQg3JF+
// SIG // t9xNctRBd9ldfM0HK7II8yPfty3u5pb5Njnm7YYwgZgw
// SIG // gYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQD
// SIG // Ex1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAIT
// SIG // MwAAAhlesthUdfSxjQABAAACGTAiBCBNag/Sk039w6Hd
// SIG // OSEIORI6F3vS6+diuTGykevsYEFd0TANBgkqhkiG9w0B
// SIG // AQsFAASCAgCABQ7jN4v1iXJQZoRYVFhcisXti8QayVg+
// SIG // vTxgmUOug/o/g5+3wZHOfI0yiwXuZY3tkE/ygIypigV5
// SIG // PWmh+2QxTPHDSk4UrwscXuRn381KLDlBj01OGS+YVSBK
// SIG // 5A1UBY4FNtxLeAIFhfqkvPIBf84N99AhxE48/jUSR8dQ
// SIG // 4XpEv/jtDDJ+0cNvtIrEO8zY+7Tn8FbW/wZgPmgxLquI
// SIG // hyge2pt/mBxGQH5sbvIz6k6MzmeLiQj5QrKlGiCaDoP2
// SIG // KK6DJCmBHjF9co9cfJ9224i/2QRGun0bo0w2gWltILHv
// SIG // PIXZSy4bk5SdsYD/RqC/OnztLEFtDxjuKhbCRrhXcXYN
// SIG // /DM2IV1LARWloqloMom5hNAZzNYXTzFy70N6nY/XUF3F
// SIG // AopYFAmVxaEQpO/0ijQU3prE5hlUSOs/uOt+ogQyJyGI
// SIG // yo2UwZj6+kpWQOPBzvx+km5BT9dlfe+B7DHj0SKYlt4k
// SIG // aLefJftdzev3XRER2ij+4K4QmeFeUNmscVwm23t7IJmH
// SIG // HfGwmkq1acvEbobN/PNZdX5wz52MK9tIiiTBt5fkD0dF
// SIG // I741Z8drGz7HaPV2lPNzO2EWPeDxQz9gk+motcIxkL3D
// SIG // 4MIr+n4JUUMHH+RPtUTkUOPquh4HWWaRVo/5CvwU6KTK
// SIG // trFBo7XqT9L2WYWDx4GIBaPSJrzwZ1cUdQ==
// SIG // End signature block
