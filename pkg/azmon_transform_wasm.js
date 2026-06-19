/* @ts-self-types="./azmon_transform_wasm.d.ts" */

/**
 * Get validation metadata json formatted string.
 *
 * * Returns a json formatted string containing metadata.
 *
 * The returned json formatted string has the following form:
 *
 * ```jsonc
 * {
 *   // Special case "_metadata" key
 *   "_metadata": {
 *     // Compile time of this component
 *     "compileTime": "2025-12-22T20:05:14Z"
 *   },
 *   // All valid processors
 *   "...processor_name...": {
 *     "configuration": {
 *       // Template used by validation libary to drive validating processor configuration.
 *     },
 *     // Optional list of valid locations
 *     "locations": [
 *       // See spec
 *     ]
 *   }
 * }
 * ```
 *
 * Specification:
 * [Validation Library for AzMon Transform DCR](https://github.com/aep-health-and-standards/Telemetry-Collection-Spec/blob/main/ObservabilityAgents-Shared-Components/AzMon-Transformation/validation-lib.md)
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
        wasm.__wbindgen_export(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Validate transformation processors in a json string.
 *
 * * `transformation_json` - A json formatted string.
 * * Returns a json formatted string.
 *
 * The `transformation_json` json formatted string has the following form:
 *
 * ```jsonc
 * {
 *   "properties": {
 *     "streamDeclarations": {
 *       // streamDeclarations may be referenced for schemas
 *       "...stream-name...": {
 *         // See spec
 *       }
 *     },
 *     "transformations": [
 *       // Validation will occur for this section
 *       {
 *         "name": "...transform_name...",
 *         "headerProcessor": {
 *           // See spec
 *         },
 *         "processors": {
 *           // See spec
 *         }
 *       }
 *     ]
 *   }
 * }
 * ```
 *
 * The returned json formatted string has the following form:
 *
 * ```jsonc
 * {
 *   "transforms": [
 *     {
 *       "name": "...transform_name...",
 *       "processors": [
 *         {
 *            "name": "...processor name...",  // See spec
 *            "kql": "...Rendered KQL snippet...",  // See spec
 *            "schema": [
 *              // See spec
 *            ],
 *            "logs": [
 *              // See spec
 *            ]
 *         }
 *       ]
 *     }
 *   ],
 *   "logs": [
 *     // See spec
 *   ]
 * }
 * ```
 *
 * Specification:
 * [Validation Library for AzMon Transform DCR](https://github.com/aep-health-and-standards/Telemetry-Collection-Spec/blob/main/ObservabilityAgents-Shared-Components/AzMon-Transformation/validation-lib.md)
 * @param {string} transformation_json
 * @returns {string}
 */
export function validate(transformation_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(transformation_json, wasm.__wbindgen_export2, wasm.__wbindgen_export3);
        const len0 = WASM_VECTOR_LEN;
        wasm.validate(retptr, ptr0, len0);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export(deferred2_0, deferred2_1, 1);
    }
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_9c31b086c2b26051: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_getTime_09f1dd40a44edb30: function(arg0) {
            const ret = getObject(arg0).getTime();
            return ret;
        },
        __wbg_log_eb752234eec406d1: function(arg0) {
            console.log(getObject(arg0));
        },
        __wbg_new_0_2722fcdb71a888a6: function() {
            const ret = new Date();
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_object_drop_ref: function(arg0) {
            takeObject(arg0);
        },
    };
    return {
        __proto__: null,
        "./azmon_transform_wasm_bg.js": import0,
    };
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function dropObject(idx) {
    if (idx < 1028) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getObject(idx) { return heap[idx]; }

let heap = new Array(1024).fill(undefined);
heap.push(undefined, null, true, false);

let heap_next = heap.length;

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

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
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

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
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

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('azmon_transform_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };

// SIG // Begin signature block
// SIG // MIIpAAYJKoZIhvcNAQcCoIIo8TCCKO0CAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // tNAOygDyu/WN3h5U+OnzFB12H7h8zSdlw7z4nfZdIaig
// SIG // gg3SMIIGvDCCBKSgAwIBAgITMwAAANLYbEaxncayoAAA
// SIG // AAAA0jANBgkqhkiG9w0BAQwFADBiMQswCQYDVQQGEwJV
// SIG // UzEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MTMwMQYDVQQDEypBenVyZSBSU0EgUHVibGljIFNlcnZp
// SIG // Y2VzIENvZGUgU2lnbmluZyBQQ0EwHhcNMjYwMzA1MTkw
// SIG // NjE4WhcNMjcwMzAzMTkwNjE4WjCBgjELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEsMCoGA1UEAxMjQXp1cmUgUHVibGljIFNl
// SIG // cnZpY2VzIFJTQSBDb2RlIFNpZ24wggGiMA0GCSqGSIb3
// SIG // DQEBAQUAA4IBjwAwggGKAoIBgQCzWKZG9P7t0hKBimeC
// SIG // eMptumOPqwHZzspivt8o8D+6mS0L1WzQjEvrAtSYvzQI
// SIG // MJXDWAf7ItbG2MxPPOVPtHNQaA8+mr9GdNgsb9bJM2hK
// SIG // 4y4P1elGhGGX8NimfQZW9TeSAZsYe0OfRjMdwIphuyjh
// SIG // 8kbARy3/mnDliXCdGj0u1Ft1qw87+bT6FlZ8Pv+OykUW
// SIG // /WAM28r56qu1C5qm6Xx5LvRBxzk+i4K+Mu17yN3ALlad
// SIG // 5w9uetGBa3WK1eN8ftCd2K0SV0AzpPVcuWbuYhhdifMW
// SIG // trtg4r7pgWxQDBu6gSicXRt7oBFY56ilLxNqzs+UrhTq
// SIG // Kq1taSw1qC3s0KzyxEC/Bz2+OFjnfbeZQxF2dMJ1r2Vw
// SIG // E5nW65uckXepwgofsKgs806jTkt4Br8Kd0PAwmC9qF4T
// SIG // xereCls2gIQmvAJxkACZnCbXGJp7XZ6Xsw+nykQzpiov
// SIG // dlNLwTm/zzkDQSws7z+7m6jZEB3d7hiOqsuz47MEfmUJ
// SIG // qluOioDD6d8CAwEAAaOCAcgwggHEMA4GA1UdDwEB/wQE
// SIG // AwIHgDAfBgNVHSUEGDAWBggrBgEFBQcDAwYKKwYBBAGC
// SIG // N1sBATAdBgNVHQ4EFgQUYqV4NR+DJwhQtHAKZqMo4HsM
// SIG // aRkwVAYDVR0RBE0wS6RJMEcxLTArBgNVBAsTJE1pY3Jv
// SIG // c29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGltaXRlZDEW
// SIG // MBQGA1UEBRMNNDY5OTgxKzUwNzE4NzAfBgNVHSMEGDAW
// SIG // gBTxL7qRFnzefVInMfV6+9VYWWk6PTBvBgNVHR8EaDBm
// SIG // MGSgYqBghl5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpb3BzL2NybC9BenVyZSUyMFJTQSUyMFB1YmxpYyUy
// SIG // MFNlcnZpY2VzJTIwQ29kZSUyMFNpZ25pbmclMjBQQ0Eu
// SIG // Y3JsMHwGCCsGAQUFBwEBBHAwbjBsBggrBgEFBQcwAoZg
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9j
// SIG // ZXJ0cy9BenVyZSUyMFJTQSUyMFB1YmxpYyUyMFNlcnZp
// SIG // Y2VzJTIwQ29kZSUyMFNpZ25pbmclMjBQQ0EuY3J0MAwG
// SIG // A1UdEwEB/wQCMAAwDQYJKoZIhvcNAQEMBQADggIBAKMM
// SIG // UX0YVUUCTqE50xhl9Pk0hRfkLD14eIdvc+/cwwgKs2mR
// SIG // DMG66/dGboyhlj1pogVsnvh0ByqJoFQYP/bqzQIgXJZM
// SIG // 778xRQ3b5REzU+6sEFdnDBdWe2lT3SoEZD4gPGcqj6BZ
// SIG // w/1dJDLeenv9hUIqZMGE28IZx26CIVXoieUq9Bj69Z0n
// SIG // o0bzuzx20QwOqZ6yhiUT9UtOzSF55T3DJlx3COEYfQQP
// SIG // Oomvj2V6lIVpum3v7OFSjGzTJaCcY/JKYqDHrcDCdmau
// SIG // 3zAiCMkNJk5Nmsg5BPjes7MML/cC+6fSs+L3N1c8ilGt
// SIG // Y7ghulNnBnJv+UZuD7ig5gANLk4wK/I5Y2BtxAtNowsy
// SIG // nthb9Tnck5nYJ6i3HyWUc24TuXXAF++dG+H8Yes16vJL
// SIG // HqH5b2xywVJelLFpYOj7kvGT8jJFZKUAJe1c//D1rBkA
// SIG // Y+BT39mkAEd81B59pTHOwVS9uVxcwGa3yEXryhWbh44q
// SIG // LQE9kfh8bypq2vLeSYZQX5kn3Lxyzk+W41MmabZHSu2R
// SIG // X7ve201BkkpGuq8PL7IdQT8uba6Wqv7Pewiz4HsUfc0l
// SIG // +PhcXgfn1ArJiUW1Sww92sLFk7C0UCufMjtxvxMwkfJc
// SIG // edZWVele21OzOEXSzFf5OkPg6ne7JOvZeJYmCaFITJE+
// SIG // 9ha6TSs+TczP61FR7+ptMIIHDjCCBPagAwIBAgITMwAA
// SIG // AAKyxJOIeFns0wAAAAAAAjANBgkqhkiG9w0BAQwFADBb
// SIG // MQswCQYDVQQGEwJVUzEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSwwKgYDVQQDEyNNaWNyb3NvZnQg
// SIG // UlNBIFNlcnZpY2VzIFJvb3QgQ0EgMjAyMTAeFw0yMTA5
// SIG // MDIxNzQxMTlaFw0zNjA5MDIxNzUxMTlaMGIxCzAJBgNV
// SIG // BAYTAlVTMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xMzAxBgNVBAMTKkF6dXJlIFJTQSBQdWJsaWMg
// SIG // U2VydmljZXMgQ29kZSBTaWduaW5nIFBDQTCCAiIwDQYJ
// SIG // KoZIhvcNAQEBBQADggIPADCCAgoCggIBAKXd/Sy91nFg
// SIG // seVJOFgeRhVxrcahyp1YGSN0FpOEgEREVb3ND/QgI7I0
// SIG // yd7XG6OE8Vomr5FMxvK8TvJ4Lc6LP9BDz2GSa1M0LlzH
// SIG // KX757/24C0ZndzccA1qQi00+BmmOr4plmxRzTFv4Phdw
// SIG // 8yBPF9GDvClqV8ASvvbitfjaD7dVPOFLb7N7fvt/qWog
// SIG // GN5eis0FXCqVJdmPZZaX2h4iG0otsAhfq8yvSlJ0YwO4
// SIG // i5GDeLQwTsMN1Rf2UAHQKCUYkFsLSQ0mqbaRbDZhB+2p
// SIG // FL/q/c2a6hlHLnapYyfwlNFXkDhwAFWEzfwFHER2oR42
// SIG // UayfN9tsO/p2tWk33CrnHdndJDrIZ6oQ3D+Ngol/TR8B
// SIG // AgXCIM6se6YlLDTsxRwh9QUDq7KVhKy58HGKJUqwgIW0
// SIG // E7cvlzUl0Hft/ebhALZyFDkhof9C5Cq4c/486XLjQq0n
// SIG // buKsFNhQU0yvABR3eohw63Kps66Uma48oE0JmqOxmzrP
// SIG // vrITYcsnByKleiHn+4yq+Ts/KrtqkQwQcuikMPrZwXCt
// SIG // sYkxMUyUn8gr8oew22WDeIQECAM1Cz9TcdJadsrToKqX
// SIG // Qa2bAn/AABAYyogPPONfGvojTI3DlYD42etMa/gPeZJa
// SIG // vX+z7x8d/4eYBnJ9WFSi9q0v+vLOGc3fyM2KQtq5eVbH
// SIG // X5rVyWc6bJ35AgMBAAGjggHCMIIBvjAQBgkrBgEEAYI3
// SIG // FQEEAwIBADAdBgNVHQ4EFgQU8S+6kRZ83n1SJzH1evvV
// SIG // WFlpOj0wVAYDVR0gBE0wSzBJBgRVHSAAMEEwPwYIKwYB
// SIG // BQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTAZBgkrBgEE
// SIG // AYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYw
// SIG // DwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBQODLFk
// SIG // ab0tsdVrJqZH6lZOgMPtijBmBgNVHR8EXzBdMFugWaBX
// SIG // hlVodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBSU0ElMjBTZXJ2aWNlcyUy
// SIG // MFJvb3QlMjBDQSUyMDIwMjEuY3JsMHMGCCsGAQUFBwEB
// SIG // BGcwZTBjBggrBgEFBQcwAoZXaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tL3BraW9wcy9jZXJ0cy9NaWNyb3NvZnQl
// SIG // MjBSU0ElMjBTZXJ2aWNlcyUyMFJvb3QlMjBDQSUyMDIw
// SIG // MjEuY3J0MA0GCSqGSIb3DQEBDAUAA4ICAQBin7PMBnXj
// SIG // nIJ0x++LnudLDWWnZ8dZmJ14DuZfUss/doUThLAM4crr
// SIG // HaTbJoulUUELNd2AnOpX/Z4tenUMT3sjYIdPYyJfIYWP
// SIG // RqfI6Nbz+JVK7RRvn2nl5EEMIuRE6UKS9ZGBbf02a7sb
// SIG // 04E/7BN/NhhrmtS/tVFjfRrrVh9zXku45rqWuCwUTzg3
// SIG // EqxKQ8OGbtjBQtq/Syb/clm5BHsoh3XhMnb9VLv3G1du
// SIG // Nf90FL5/o88XZ4L18nx1lfky2nllY4HIA8PK8AarqAW4
// SIG // iKSTA3EGqn8s/47WtQKT+qED2YbZXVOYL+L7vQDCnFbw
// SIG // hgAx6ucuMz7Ae1rqibg3AjsC7U5M3oA/vqAHDKDA3mdM
// SIG // 5D6L/ZEdQgaG20HhUOSQ+CiQD3TyHSiVCfVMuTv83IiK
// SIG // Cni3LW/23tHC2tbN57rlhMcoyjIi+IVd7j7s41MFBaDw
// SIG // JrmfXn/YM+lR/5QqvO7zWAbbr/XU531v3jr/jBilmrqt
// SIG // 6U/b7y8TXyA9nYxV9iSMFmcbyIi2xgdcAHhxnpXcvcvy
// SIG // FWET6YiJiyeSJZwwJv8gwXiBF+Zh0IHArl6KVsbAdsAT
// SIG // uP1TCEBpPynXZmkviIEWPtnv315ZjTC7nPoOpSnOVaO7
// SIG // wZztrOefZunI5fBxw7mG1oyoRnADZawiFsVo9J/cDu15
// SIG // ErRCfDQRhwSiBTGCGoYwghqCAgEBMHkwYjELMAkGA1UE
// SIG // BhMCVVMxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEzMDEGA1UEAxMqQXp1cmUgUlNBIFB1YmxpYyBT
// SIG // ZXJ2aWNlcyBDb2RlIFNpZ25pbmcgUENBAhMzAAAA0ths
// SIG // RrGdxrKgAAAAAADSMA0GCWCGSAFlAwQCAQUAoIGuMBkG
// SIG // CSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisGAQQB
// SIG // gjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3DQEJ
// SIG // BDEiBCBqhmjiyV6xKcKbt/2vrDi9m4QVyC8WNyil/ZCi
// SIG // 5j0OWjBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBpAGMA
// SIG // cgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNyb3Nv
// SIG // ZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBgKk1OHUP+Z8P
// SIG // i1RTMQT+JlfLevJbWsojwJJNxbt4EAdn7blNel+ML4G8
// SIG // hjUkmyujynwD86CKnYmZ0sre0xGE2Q/GvyV0Pm63RY9x
// SIG // Gs+WTtHMtXNvQ/XG9pc6vHe0Tx8s6LVMm8eRzUPK2KZU
// SIG // xH+jdIoBQKCDfMr5xF0sjWMJzXuMOOn6L5p98t95meCg
// SIG // BzY47QVKaXQfjjXlLBrYt5ppHI3qGbk+Ol2TkwVnrWs3
// SIG // 9Se8+r6J2pOWxUUWrtLTjZeYzHW39EI7UkFST52Adc8U
// SIG // aq/5OKirXvF8BxgYqaisP4hp4uCn6zM96AxUzZ8mXFbc
// SIG // Ip5KHIqI68ytjjnJFvzFhyxAEfrfDCZmJVc6WUFleKNR
// SIG // lSpyVMdcTSDyJ+HRH9vYtEP4Dq36kBD6k7r6SpDML82B
// SIG // mGTr180tGwfNluStLL0Bw7dj9dhP3aqVt2FvOo3kfjsS
// SIG // Sa/4iSPyipX77WNCs3pGDPkhYn5kaMe65JmpnHxB50V4
// SIG // CsqLyndHdUXgVbz/RqGCF60wghepBgorBgEEAYI3AwMB
// SIG // MYIXmTCCF5UGCSqGSIb3DQEHAqCCF4YwgheCAgEDMQ8w
// SIG // DQYJYIZIAWUDBAIBBQAwggFaBgsqhkiG9w0BCRABBKCC
// SIG // AUkEggFFMIIBQQIBAQYKKwYBBAGEWQoDATAxMA0GCWCG
// SIG // SAFlAwQCAQUABCDlfdD/nV8CWxCvrfSwinc/Cqba/a9D
// SIG // htHBIYO7ytEktwIGahCV1ox5GBMyMDI2MDYxOTE4MDQ0
// SIG // OS44NTlaMASAAgH0oIHZpIHWMIHTMQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMS0wKwYDVQQLEyRNaWNyb3NvZnQgSXJlbGFu
// SIG // ZCBPcGVyYXRpb25zIExpbWl0ZWQxJzAlBgNVBAsTHm5T
// SIG // aGllbGQgVFNTIEVTTjoyRDFBLTA1RTAtRDk0NzElMCMG
// SIG // A1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vydmlj
// SIG // ZaCCEfswggcoMIIFEKADAgECAhMzAAACEtEIBjzKGE+q
// SIG // AAEAAAISMA0GCSqGSIb3DQEBCwUAMHwxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFBDQSAyMDEwMB4XDTI1MDgxNDE4NDgxNVoX
// SIG // DTI2MTExMzE4NDgxNVowgdMxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5kIE9w
// SIG // ZXJhdGlvbnMgTGltaXRlZDEnMCUGA1UECxMeblNoaWVs
// SIG // ZCBUU1MgRVNOOjJEMUEtMDVFMC1EOTQ3MSUwIwYDVQQD
// SIG // ExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIIC
// SIG // IjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAr0zT
// SIG // oDkpWQtsZekS0cV0quDdKSTGkovvBaZH0OAIEi0O3CcO
// SIG // 77JiX8c4Epq9uibHVZZ1W/LoufE172vkRXO+QYNtWWor
// SIG // ECJ2AcZQ10bpAltkhZNiXlVJ8L3QzhKgrXrmMkm2J+/g
// SIG // 81U23JPcO4wXHEftonT3wpd//936rjmwxMm7NkbsygbJ
// SIG // f+4AVBMNr4aMPQhBd76od0KMB6WrvyEGOOU0893OFufS
// SIG // 5EDey4n44WgaxJE0Vnv3/OOvuOw5Kp1KPqjjYJ+L9ywL
// SIG // uBMtcDfLpNQO/h1eFEoMrbiEM67TOfNlXfxbDz4MlsYv
// SIG // Lioxgd2Xzey1QxrV1+i+JyVDJMiSe9gKOuzpiQQFE19D
// SIG // UPgsidyjLTzXEhSVLBlRor0eCVf7gC6Rfk8NY3rO2sgg
// SIG // OL79vU5FuDKTh/sIOtcUHeHC42jBGB+tfdKC1KOBR+Ul
// SIG // N9aOzg8mpUNI2FgqQvirVP9ppbeMUfvp2wA9voyTiRWv
// SIG // DgzCxo8xlJ1nscYTHIQrmkF9j/Ca0IDmt8fvOn64nnlJ
// SIG // OGUYZYHMC1l0xtgkYTE1ESUqqkawKk7iqbxdnLyycS+d
// SIG // R+zaxPudMDLrQFz8lgfy9obk0D8HC2dzhWpYNn5hdkoP
// SIG // EzgCqQUOp8v3Qj/sd4anyupe5KoCkjABOP3yhSQ4W9Z+
// SIG // DrJnhM/rbsXC7oTv26cCAwEAAaOCAUkwggFFMB0GA1Ud
// SIG // DgQWBBRSBblSxb5cYKYOwvd/VfoXOfu33jAfBgNVHSME
// SIG // GDAWgBSfpxVdAF5iXYP05dJlpxtTNRnpcjBfBgNVHR8E
// SIG // WDBWMFSgUqBQhk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0
// SIG // YW1wJTIwUENBJTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUH
// SIG // AQEEYDBeMFwGCCsGAQUFBzAChlBodHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01pY3Jvc29m
// SIG // dCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNy
// SIG // dDAMBgNVHRMBAf8EAjAAMBYGA1UdJQEB/wQMMAoGCCsG
// SIG // AQUFBwMIMA4GA1UdDwEB/wQEAwIHgDANBgkqhkiG9w0B
// SIG // AQsFAAOCAgEAXnSAkmX79Rc7lxS1wOozXJ7V0ou5DntV
// SIG // cOJplIkDjvEN8BIQph4U+gSOLZuVReP/z9YdUiUkcPwL
// SIG // 1PM245/kEX1EegpxNc8HDA6hKCHg0ALNEcuxnGOlgKLo
// SIG // kXfUer1D5hiW8PABM9R+neiteTgPaaRlJFvGTYvotc0u
// SIG // qGiES5hMQhL8RNFhpS9RcIWHtnQGEnrdOUvCAhs4FeVi
// SIG // awcmLTKv+1870c/MeTHi0QDdeR+7/Wg4qhkJ2k1iEHJd
// SIG // mYf8rIV0NRBZcdRTTdHee35SXP5neNCfAkjDIuZycRud
// SIG // 6jzPLCNLiNYzGXBswzJygj4EeSORT7wMvaFuKeRAXoXC
// SIG // 3wwYvgIsI1zn3DGY625Y+yZSi8UNSNHuri36Zv9a+Q4v
// SIG // JwDpYK36S0TB2pf7xLiiH32nk7YK73Rg98W6fZ2INuzY
// SIG // zZ7Ghgvfffkj4EUXg1E0EffY1pEqkbpDTP7h/DBqtzoP
// SIG // Xsyw2MUh+7yvWcq2BGZSuca6CY6X4ioMuc5PWpsmvOOl
// SIG // i7ARNA7Ab8kKdCc2gNDLacglsweZEc9/VQB6hls/b6Kk
// SIG // 32nkwuHExKlaeoSVrKB5U9xlp1+c8J/7GJj4Rw7AiQ8t
// SIG // cp+WmfyD8KxX2QlKbDi4SUjnglv4617R8+a/cDWJyaMt
// SIG // 8279Wn7f2yMedN7kfGIQ5SZj66RdhdlZOq8wggdxMIIF
// SIG // WaADAgECAhMzAAAAFcXna54Cm0mZAAAAAAAVMA0GCSqG
// SIG // SIb3DQEBCwUAMIGIMQswCQYDVQQGEwJVUzETMBEGA1UE
// SIG // CBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEe
// SIG // MBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMTIw
// SIG // MAYDVQQDEylNaWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0
// SIG // ZSBBdXRob3JpdHkgMjAxMDAeFw0yMTA5MzAxODIyMjVa
// SIG // Fw0zMDA5MzAxODMyMjVaMHwxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1w
// SIG // IFBDQSAyMDEwMIICIjANBgkqhkiG9w0BAQEFAAOCAg8A
// SIG // MIICCgKCAgEA5OGmTOe0ciELeaLL1yR5vQ7VgtP97pwH
// SIG // B9KpbE51yMo1V/YBf2xK4OK9uT4XYDP/XE/HZveVU3Fa
// SIG // 4n5KWv64NmeFRiMMtY0Tz3cywBAY6GB9alKDRLemjkZr
// SIG // BxTzxXb1hlDcwUTIcVxRMTegCjhuje3XD9gmU3w5YQJ6
// SIG // xKr9cmmvHaus9ja+NSZk2pg7uhp7M62AW36MEBydUv62
// SIG // 6GIl3GoPz130/o5Tz9bshVZN7928jaTjkY+yOSxRnOlw
// SIG // aQ3KNi1wjjHINSi947SHJMPgyY9+tVSP3PoFVZhtaDua
// SIG // Rr3tpK56KTesy+uDRedGbsoy1cCGMFxPLOJiss254o2I
// SIG // 5JasAUq7vnGpF1tnYN74kpEeHT39IM9zfUGaRnXNxF80
// SIG // 3RKJ1v2lIH1+/NmeRd+2ci/bfV+AutuqfjbsNkz2K26o
// SIG // ElHovwUDo9Fzpk03dJQcNIIP8BDyt0cY7afomXw/TNuv
// SIG // XsLz1dhzPUNOwTM5TI4CvEJoLhDqhFFG4tG9ahhaYQFz
// SIG // ymeiXtcodgLiMxhy16cg8ML6EgrXY28MyTZki1ugpoMh
// SIG // XV8wdJGUlNi5UPkLiWHzNgY1GIRH29wb0f2y1BzFa/Zc
// SIG // UlFdEtsluq9QBXpsxREdcu+N+VLEhReTwDwV2xo3xwgV
// SIG // GD94q0W29R6HXtqPnhZyacaue7e3PmriLq0CAwEAAaOC
// SIG // Ad0wggHZMBIGCSsGAQQBgjcVAQQFAgMBAAEwIwYJKwYB
// SIG // BAGCNxUCBBYEFCqnUv5kxJq+gpE8RjUpzxD/LwTuMB0G
// SIG // A1UdDgQWBBSfpxVdAF5iXYP05dJlpxtTNRnpcjBcBgNV
// SIG // HSAEVTBTMFEGDCsGAQQBgjdMg30BATBBMD8GCCsGAQUF
// SIG // BwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
// SIG // b3BzL0RvY3MvUmVwb3NpdG9yeS5odG0wEwYDVR0lBAww
// SIG // CgYIKwYBBQUHAwgwGQYJKwYBBAGCNxQCBAweCgBTAHUA
// SIG // YgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMB
// SIG // Af8wHwYDVR0jBBgwFoAU1fZWy4/oolxiaNE9lJBb186a
// SIG // GMQwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDovL2NybC5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWlj
// SIG // Um9vQ2VyQXV0XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUF
// SIG // BwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNSb29DZXJB
// SIG // dXRfMjAxMC0wNi0yMy5jcnQwDQYJKoZIhvcNAQELBQAD
// SIG // ggIBAJ1VffwqreEsH2cBMSRb4Z5yS/ypb+pcFLY+Tkdk
// SIG // eLEGk5c9MTO1OdfCcTY/2mRsfNB1OW27DzHkwo/7bNGh
// SIG // lBgi7ulmZzpTTd2YurYeeNg2LpypglYAA7AFvonoaeC6
// SIG // Ce5732pvvinLbtg/SHUB2RjebYIM9W0jVOR4U3UkV7nd
// SIG // n/OOPcbzaN9l9qRWqveVtihVJ9AkvUCgvxm2EhIRXT0n
// SIG // 4ECWOKz3+SmJw7wXsFSFQrP8DJ6LGYnn8AtqgcKBGUIZ
// SIG // UnWKNsIdw2FzLixre24/LAl4FOmRsqlb30mjdAy87JGA
// SIG // 0j3mSj5mO0+7hvoyGtmW9I/2kQH2zsZ0/fZMcm8Qq3Uw
// SIG // xTSwethQ/gpY3UA8x1RtnWN0SCyxTkctwRQEcb9k+SS+
// SIG // c23Kjgm9swFXSVRk2XPXfx5bRAGOWhmRaw2fpCjcZxko
// SIG // JLo4S5pu+yFUa2pFEUep8beuyOiJXk+d0tBMdrVXVAmx
// SIG // aQFEfnyhYWxz/gq77EFmPWn9y8FBSX5+k77L+DvktxW/
// SIG // tM4+pTFRhLy/AsGConsXHRWJjXD+57XQKBqJC4822rpM
// SIG // +Zv/Cuk0+CQ1ZyvgDbjmjJnW4SLq8CdCPSWU5nR0W2rR
// SIG // nj7tfqAxM328y+l7vzhwRNGQ8cirOoo6CGJ/2XBjU02N
// SIG // 7oJtpQUQwXEGahC0HVUzWLOhcGbyoYIDVjCCAj4CAQEw
// SIG // ggEBoYHZpIHWMIHTMQswCQYDVQQGEwJVUzETMBEGA1UE
// SIG // CBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEe
// SIG // MBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0w
// SIG // KwYDVQQLEyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRp
// SIG // b25zIExpbWl0ZWQxJzAlBgNVBAsTHm5TaGllbGQgVFNT
// SIG // IEVTTjoyRDFBLTA1RTAtRDk0NzElMCMGA1UEAxMcTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIjCgEBMAcG
// SIG // BSsOAwIaAxUA5VHBr4h00EN7jUdQ33SE+qbk/8CggYMw
// SIG // gYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQD
// SIG // Ex1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDAN
// SIG // BgkqhkiG9w0BAQsFAAIFAO3f+/YwIhgPMjAyNjA2MTkx
// SIG // NzMzNDJaGA8yMDI2MDYyMDE3MzM0MlowdDA6BgorBgEE
// SIG // AYRZCgQBMSwwKjAKAgUA7d/79gIBADAHAgEAAgI2LzAH
// SIG // AgEAAgIUQzAKAgUA7eFNdgIBADA2BgorBgEEAYRZCgQC
// SIG // MSgwJjAMBgorBgEEAYRZCgMCoAowCAIBAAIDB6EgoQow
// SIG // CAIBAAIDAYagMA0GCSqGSIb3DQEBCwUAA4IBAQAKJCAI
// SIG // rMs6EsxgHXg71xYDNQCq5sttsEA/uP6SA12a3miw6tvr
// SIG // CedpugIOtE0/qR/oK/c3kYlX6/IezCNWxWK4GLbMWrjA
// SIG // Pcl4EA9KBiIi81P3Wh7saQLS40+mgnmilT3YjRH79BSc
// SIG // EKlGCYzlB6LfezwpeX9WXWATqM/sUtxOXclUanJOSCki
// SIG // 9TblVS7SkUQs8GnFSh/5Vssbuo/q1ehchvyhZzzAevwm
// SIG // VX5S/bs3NMl2uWHM0IlWv9V4XORV1o4V5GIilpT+l9/v
// SIG // cKC58LKUyktsF5hWwNwBAR1APzGTHK6KQMJcduQdGYnR
// SIG // s9DY8zNRiEOT1I9Dfz/N7Fm0LS1DMYIEDTCCBAkCAQEw
// SIG // gZMwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMA
// SIG // AAIS0QgGPMoYT6oAAQAAAhIwDQYJYIZIAWUDBAIBBQCg
// SIG // ggFKMBoGCSqGSIb3DQEJAzENBgsqhkiG9w0BCRABBDAv
// SIG // BgkqhkiG9w0BCQQxIgQgtK2I1LHgRMqjX+/Ddv8du9sV
// SIG // 6FbGIiDVainyKzQ6JFowgfoGCyqGSIb3DQEJEAIvMYHq
// SIG // MIHnMIHkMIG9BCBz+X5GvO7WngknH4BZeYU+BzBL1Jy5
// SIG // oJ8wVlTNIxfYgzCBmDCBgKR+MHwxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQSAyMDEwAhMzAAACEtEIBjzKGE+qAAEAAAIS
// SIG // MCIEIMFzclYEgyJVcTKYm4Fj9VBoTclgneNJFr5w5AVt
// SIG // OTdUMA0GCSqGSIb3DQEBCwUABIICAKW0hm4O6YImPq+/
// SIG // bJJzg5HoKZkNw6kYsi58LEdPhAPRt7+0HTOmRPgVE/nA
// SIG // ERPiPXeZ7O7UTL7uhYrNyoJS0ya4MG2NVZpeDMw7W2Ak
// SIG // nOXcT88jEQXyCenrvy6o+uojj7xepiavxzajmyV25NGv
// SIG // uHIVBBeCHBSmk1quY35WUJFi70kgncIN0Ol1yB2R7LlM
// SIG // Wlww5eSKLZR0y0vkv01EeBTXWQ7CE1sxaV762Z+npeg0
// SIG // pmIBUYfTHDrPIEVCPaXuV1Ht9l4yxysiaRQTlXp3zjl1
// SIG // hNPt7oEXm83HDHmIOs2W+a/KjnFbYBn7iT2YSDjOQbbb
// SIG // HcTaZmk8nKmaVOTbT5ZuVt6m/DkOsLZB2gwEJIbZc88/
// SIG // wt0ulGWGm2tzWAPjTev+VWLAV4/hb9Po6JhkgiGMdun4
// SIG // VzNodXa7QaLVXcbXqN03NWt/6acl/x1mIlS6IiiGIhi/
// SIG // vskKAqBdnxaQPl1u4cEB6F/j9AN8g/XE+x5RjzSc9p9M
// SIG // ZVaE8kFIBmV5BU+xbdQbqFPKe55/g17zi+GyGakfLBGV
// SIG // 8E2IJwKZgkGilRA3nbZxI/BrCP7nkHVoRRiA4PBowcJe
// SIG // H+wwl9chYcXxsZzsqbUMHQokDIg/LMSdfYP1f7Ntsvsm
// SIG // hdWvM6xWbDdBqKY+OGPNPdXHI5Duhx8Emn1yBOrjexT4
// SIG // SxszVxqM
// SIG // End signature block
