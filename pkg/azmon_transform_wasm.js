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
        __wbg___wbindgen_throw_bb96b2010945f0bc: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_getTime_63fb0332e6c4ec17: function(arg0) {
            const ret = getObject(arg0).getTime();
            return ret;
        },
        __wbg_log_00befdb045a7af0e: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_new_0_f117d868b403dc07: function() {
            const ret = new Date();
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
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

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
// SIG // MIIo5QYJKoZIhvcNAQcCoIIo1jCCKNICAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // VejFJoinvpn6CnOEq6j5SDHQ6284nkEYQaYTFN9I/V6g
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
// SIG // ErRCfDQRhwSiBTGCGmswghpnAgEBMHkwYjELMAkGA1UE
// SIG // BhMCVVMxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEzMDEGA1UEAxMqQXp1cmUgUlNBIFB1YmxpYyBT
// SIG // ZXJ2aWNlcyBDb2RlIFNpZ25pbmcgUENBAhMzAAAA0ths
// SIG // RrGdxrKgAAAAAADSMA0GCWCGSAFlAwQCAQUAoIGQMBkG
// SIG // CSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMC8GCSqGSIb3
// SIG // DQEJBDEiBCCBQRTdsm0qffkbfvKmEBdD2bsH219j4Ddq
// SIG // J9R0LZ1dXDBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBgF0pcWXc
// SIG // nxqcvq6qd+jurkj8T92rlc/hF8OUk9hMEXlVZILgnIMb
// SIG // 0ng2mLNGGs3QwsGh9CsLn1W3qAEPzwbhN1eSmcasp9aO
// SIG // mus5PCrhZsxkgfifD54YvaQBWDPwhp6Ek9wKaK/BRUbR
// SIG // nh2MVVe0LxKKYrXV4nzy4yiLhDen8x77XFMoJFRlH1S5
// SIG // AUXYC/mG+8T2FNff5l4tlPmSP57ns7CCqi6ft+WVVvk0
// SIG // PF4EF4nOhkzC6nkZIaeaEh2U79IXWuqEjpqA1dryN/Lh
// SIG // aTrP+9p3/EqzY8MPfPbFAvsbkZHeadEBe7tJYqUTc5Rd
// SIG // 0mLCcyoI1N28s+pEIeH6uCP557QjfbAH8dqrwD9ItLxD
// SIG // 3YxfMusTRjKg/W4BJj5gEosWDYpAgpqAdIV9pKT1M4SN
// SIG // lChCdk3p6W3Yr3f3C8hsHBzTPaVlnWqAQ5DOI2Mh6xnL
// SIG // HvJF++PLzke8UypHEK7HMNFklOgYi47bGXuH4v+CDgIy
// SIG // PQ8+z+2DByAB+MbKRuy90KGCF7AwghesBgorBgEEAYI3
// SIG // AwMBMYIXnDCCF5gGCSqGSIb3DQEHAqCCF4kwgheFAgED
// SIG // MQ8wDQYJYIZIAWUDBAIBBQAwggFaBgsqhkiG9w0BCRAB
// SIG // BKCCAUkEggFFMIIBQQIBAQYKKwYBBAGEWQoDATAxMA0G
// SIG // CWCGSAFlAwQCAQUABCBPOZzwKAUvTgwaZ1YWWdq1o7a1
// SIG // 9OH5CFoVJgytxsYp3wIGatzVNOINGBMyMDI2MTAzMDE5
// SIG // MjQzMS4wODlaMASAAgH0oIHZpIHWMIHTMQswCQYDVQQG
// SIG // EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
// SIG // BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENv
// SIG // cnBvcmF0aW9uMS0wKwYDVQQLEyRNaWNyb3NvZnQgSXJl
// SIG // bGFuZCBPcGVyYXRpb25zIExpbWl0ZWQxJzAlBgNVBAsT
// SIG // Hm5TaGllbGQgVFNTIEVTTjo0MzFBLTA1RTAtRDk0NzEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZaCCEf4wggcoMIIFEKADAgECAhMzAAACHUvAkoc4
// SIG // hX45AAEAAAIdMA0GCSqGSIb3DQEBCwUAMHwxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQSAyMDEwMB4XDTI1MDgxNDE4NDgz
// SIG // M1oXDTI2MTExMzE4NDgzM1owgdMxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5k
// SIG // IE9wZXJhdGlvbnMgTGltaXRlZDEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjQzMUEtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // orSgaAA8oOl4ph574zw29egUN8DDepRHLX8FM1zHNJmX
// SIG // G6KrSqUKwzcKafopuYdPTETTCvb9aJfESuAU0iGNUFI/
// SIG // D6R0kvdfpe2oPX+E3sbTQvGi4JPH5qdIYUaJ45V/4bqe
// SIG // 8eNvbWzpC+ZKjH193DeiI1XAI918JoQmBhlEXo/Ton17
// SIG // 21luZJgincsf5LjMY3jX84WyXUSX3dsS7h/7xVI+w1yj
// SIG // g7pa+0y3o/me2Tsv6UJUdSTQap5ORGSfCnclnP1z3Iii
// SIG // WIWr3Vo7aIPWsgJzq3m5GxpxUHCQk8qzUhk50y/uB+LG
// SIG // E3WIK2C77iy9iFsSfSLUnyMEzGRDW9mXHT4PH7Ozz6CH
// SIG // qQEiNvwcHqlvlCh1pHQh1NXQSAqOoVBs5mi6easf6yxW
// SIG // Tfe5DrR79503r8pU6VqC2Y9XMRU4wH9QbYXYsIUZ33Jm
// SIG // ndy22W1LBDAbxBPQHCBlncGDU3BgdhVUVLe80mggFO98
// SIG // FdkWho67w4kPdCTRkvdvkY8PrQYE/nQjHXCa0g7LcMtt
// SIG // Zb6ejMHfQ+tUWXv6+nZ4Ynkr2OkaxclFCw4RIYNMWD26
// SIG // AWbQj/WEdzga18fKtw66L5gzXPza6jFBfPJeKE3H8QAu
// SIG // wpirmH4ms+5nUjNNQOmNgqJn0U1+3Yn7ClswD79YN0r3
// SIG // fdbYBMDApBZJpNlK7q7HXRsCAwEAAaOCAUkwggFFMB0G
// SIG // A1UdDgQWBBSEWfBxNEamZtXm8gl92Yq80jfxXTAfBgNV
// SIG // HSMEGDAWgBSfpxVdAF5iXYP05dJlpxtTNRnpcjBfBgNV
// SIG // HR8EWDBWMFSgUqBQhk5odHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQlMjBUaW1l
// SIG // LVN0YW1wJTIwUENBJTIwMjAxMCgxKS5jcmwwbAYIKwYB
// SIG // BQUHAQEEYDBeMFwGCCsGAQUFBzAChlBodHRwOi8vd3d3
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01pY3Jv
// SIG // c29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEp
// SIG // LmNydDAMBgNVHRMBAf8EAjAAMBYGA1UdJQEB/wQMMAoG
// SIG // CCsGAQUFBwMIMA4GA1UdDwEB/wQEAwIHgDANBgkqhkiG
// SIG // 9w0BAQsFAAOCAgEAkdweB4yxvLspLKq0D+miyD4Q0Ecx
// SIG // VFpNZuJxiR54gWRkeTDDuymNeB03JhlsBpbwSYJ5uZSg
// SIG // DBCvwHED2VL8lJpFlOprJzxsXWC2NTfA+O+PO5Fk5jw6
// SIG // LHh6jeBADDEdQAx3Hqi7Zm0JwvQ93z5f6dtxkm29WqOc
// SIG // HYXRXfAQwy1hSrLXyfeblqR66jpP/9n0fCkWU4ggsUjQ
// SIG // pQ2Ngj1DV09J4Y3y7p9Nd81+Xs6qYo++7RKm8qiB/5ND
// SIG // eigOLjlAeFgiEXIRUJW+mJyqpQw+OORlaqcFjR8Hu0G+
// SIG // /7bMdek68YX+kPpDBk7Ue+I/xgiYJ1xcDRBn/vczLtN7
// SIG // 2+RIlD4UgXYLuBSCk//pDEPX5z39Cr+rkc6E4Y28FPk4
// SIG // BhloAyvp628P4xfElQY8TcxraUbZShypocE6ny95D1K1
// SIG // BkltZmrHVKCxmglnuOlM15NKIrXFlXCzdqpCtIwQ417w
// SIG // NAVF/QDPvzzbumPdTi6fb0tLbScYobV6zvbBsMsKEME4
// SIG // Tj1b9oIXC8dybJq4nbboEXYpRwi1QAbpSNrn+PxGW9uf
// SIG // 1q63FnMJu4gm3Oh63njW/iVf723quzyHrSijWMgY0HiR
// SIG // iHQi0Jyu0h8MdhRUp7mxbmLQckPiOFwAlIaUN/k725y/
// SIG // aLWpkRU6fqmLlEOyH5WpyLd23AYy9r8v+Qoba6swggdx
// SIG // MIIFWaADAgECAhMzAAAAFcXna54Cm0mZAAAAAAAVMA0G
// SIG // CSqGSIb3DQEBCwUAMIGIMQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MTIwMAYDVQQDEylNaWNyb3NvZnQgUm9vdCBDZXJ0aWZp
// SIG // Y2F0ZSBBdXRob3JpdHkgMjAxMDAeFw0yMTA5MzAxODIy
// SIG // MjVaFw0zMDA5MzAxODMyMjVaMHwxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQSAyMDEwMIICIjANBgkqhkiG9w0BAQEFAAOC
// SIG // Ag8AMIICCgKCAgEA5OGmTOe0ciELeaLL1yR5vQ7VgtP9
// SIG // 7pwHB9KpbE51yMo1V/YBf2xK4OK9uT4XYDP/XE/HZveV
// SIG // U3Fa4n5KWv64NmeFRiMMtY0Tz3cywBAY6GB9alKDRLem
// SIG // jkZrBxTzxXb1hlDcwUTIcVxRMTegCjhuje3XD9gmU3w5
// SIG // YQJ6xKr9cmmvHaus9ja+NSZk2pg7uhp7M62AW36MEByd
// SIG // Uv626GIl3GoPz130/o5Tz9bshVZN7928jaTjkY+yOSxR
// SIG // nOlwaQ3KNi1wjjHINSi947SHJMPgyY9+tVSP3PoFVZht
// SIG // aDuaRr3tpK56KTesy+uDRedGbsoy1cCGMFxPLOJiss25
// SIG // 4o2I5JasAUq7vnGpF1tnYN74kpEeHT39IM9zfUGaRnXN
// SIG // xF803RKJ1v2lIH1+/NmeRd+2ci/bfV+AutuqfjbsNkz2
// SIG // K26oElHovwUDo9Fzpk03dJQcNIIP8BDyt0cY7afomXw/
// SIG // TNuvXsLz1dhzPUNOwTM5TI4CvEJoLhDqhFFG4tG9ahha
// SIG // YQFzymeiXtcodgLiMxhy16cg8ML6EgrXY28MyTZki1ug
// SIG // poMhXV8wdJGUlNi5UPkLiWHzNgY1GIRH29wb0f2y1BzF
// SIG // a/ZcUlFdEtsluq9QBXpsxREdcu+N+VLEhReTwDwV2xo3
// SIG // xwgVGD94q0W29R6HXtqPnhZyacaue7e3PmriLq0CAwEA
// SIG // AaOCAd0wggHZMBIGCSsGAQQBgjcVAQQFAgMBAAEwIwYJ
// SIG // KwYBBAGCNxUCBBYEFCqnUv5kxJq+gpE8RjUpzxD/LwTu
// SIG // MB0GA1UdDgQWBBSfpxVdAF5iXYP05dJlpxtTNRnpcjBc
// SIG // BgNVHSAEVTBTMFEGDCsGAQQBgjdMg30BATBBMD8GCCsG
// SIG // AQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpb3BzL0RvY3MvUmVwb3NpdG9yeS5odG0wEwYDVR0l
// SIG // BAwwCgYIKwYBBQUHAwgwGQYJKwYBBAGCNxQCBAweCgBT
// SIG // AHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB/wQF
// SIG // MAMBAf8wHwYDVR0jBBgwFoAU1fZWy4/oolxiaNE9lJBb
// SIG // 186aGMQwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDovL2Ny
// SIG // bC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMv
// SIG // TWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3JsMFoGCCsG
// SIG // AQUFBwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNSb29D
// SIG // ZXJBdXRfMjAxMC0wNi0yMy5jcnQwDQYJKoZIhvcNAQEL
// SIG // BQADggIBAJ1VffwqreEsH2cBMSRb4Z5yS/ypb+pcFLY+
// SIG // TkdkeLEGk5c9MTO1OdfCcTY/2mRsfNB1OW27DzHkwo/7
// SIG // bNGhlBgi7ulmZzpTTd2YurYeeNg2LpypglYAA7AFvono
// SIG // aeC6Ce5732pvvinLbtg/SHUB2RjebYIM9W0jVOR4U3Uk
// SIG // V7ndn/OOPcbzaN9l9qRWqveVtihVJ9AkvUCgvxm2EhIR
// SIG // XT0n4ECWOKz3+SmJw7wXsFSFQrP8DJ6LGYnn8AtqgcKB
// SIG // GUIZUnWKNsIdw2FzLixre24/LAl4FOmRsqlb30mjdAy8
// SIG // 7JGA0j3mSj5mO0+7hvoyGtmW9I/2kQH2zsZ0/fZMcm8Q
// SIG // q3UwxTSwethQ/gpY3UA8x1RtnWN0SCyxTkctwRQEcb9k
// SIG // +SS+c23Kjgm9swFXSVRk2XPXfx5bRAGOWhmRaw2fpCjc
// SIG // ZxkoJLo4S5pu+yFUa2pFEUep8beuyOiJXk+d0tBMdrVX
// SIG // VAmxaQFEfnyhYWxz/gq77EFmPWn9y8FBSX5+k77L+Dvk
// SIG // txW/tM4+pTFRhLy/AsGConsXHRWJjXD+57XQKBqJC482
// SIG // 2rpM+Zv/Cuk0+CQ1ZyvgDbjmjJnW4SLq8CdCPSWU5nR0
// SIG // W2rRnj7tfqAxM328y+l7vzhwRNGQ8cirOoo6CGJ/2XBj
// SIG // U02N7oJtpQUQwXEGahC0HVUzWLOhcGbyoYIDWTCCAkEC
// SIG // AQEwggEBoYHZpIHWMIHTMQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MS0wKwYDVQQLEyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVy
// SIG // YXRpb25zIExpbWl0ZWQxJzAlBgNVBAsTHm5TaGllbGQg
// SIG // VFNTIEVTTjo0MzFBLTA1RTAtRDk0NzElMCMGA1UEAxMc
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIjCgEB
// SIG // MAcGBSsOAwIaAxUAuoO+BKbfXzqyfi9GLEdWHkCLeT+g
// SIG // gYMwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
// SIG // VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAx
// SIG // MDANBgkqhkiG9w0BAQsFAAIFAO6PO/YwIhgPMjAyNjEw
// SIG // MzAxNTUzMjZaGA8yMDI2MTAzMTE1NTMyNlowdzA9Bgor
// SIG // BgEEAYRZCgQBMS8wLTAKAgUA7o879gIBADAKAgEAAgIB
// SIG // IQIB/zAHAgEAAgITJzAKAgUA7pCNdgIBADA2BgorBgEE
// SIG // AYRZCgQCMSgwJjAMBgorBgEEAYRZCgMCoAowCAIBAAID
// SIG // B6EgoQowCAIBAAIDAYagMA0GCSqGSIb3DQEBCwUAA4IB
// SIG // AQAq4Xps7aEESGpz2HD3FDgsZWuAc5rrLzKoSSI5vFI/
// SIG // SoMVpbVT/erwWxtz8FJyQaPRD1Bdi5rrXac6U6LxXpEI
// SIG // cMEZC3+TCa/L8O5MzopCG1teWoIxfA4iSJ/WM9q/ngsU
// SIG // GbcmRggTUEyooGzsk+KifRCDeH9Ki2vKPqZnh/tPjBJU
// SIG // 9EwSMPF0Bz9v69+Y0dmRImHvJi1SbXJGdLrcq3SoiVsn
// SIG // eTZOJiAnt7b/inUyAAtMZ6wDc/t2KIo6bPfHiIdEKSsu
// SIG // z68wBz3QOvWtBlYzlAyRu/jms4n8NqLHqY12yMZeg3DB
// SIG // MPLKCFnJbWf67nKBfDxtj/BmeENYNwzmk/HrMYIEDTCC
// SIG // BAkCAQEwgZMwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTACEzMAAAIdS8CShziFfjkAAQAAAh0wDQYJYIZIAWUD
// SIG // BAIBBQCgggFKMBoGCSqGSIb3DQEJAzENBgsqhkiG9w0B
// SIG // CRABBDAvBgkqhkiG9w0BCQQxIgQgjFk0gDCmm5zLGMfH
// SIG // PYEXM6OrWP7l66rS7x7OSawPAH0wgfoGCyqGSIb3DQEJ
// SIG // EAIvMYHqMIHnMIHkMIG9BCCxtpXMXEiLJzrqM77ep4rT
// SIG // NwrMOj6gpWN9hZvpj5QFUTCBmDCBgKR+MHwxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQSAyMDEwAhMzAAACHUvAkoc4hX45
// SIG // AAEAAAIdMCIEIK2n+/y8hbkXPx78KbsvTXePiUzoum4k
// SIG // D1/IiWylhN9LMA0GCSqGSIb3DQEBCwUABIICAHXPhfI0
// SIG // INZ6cVsawWPah//Q8HbkNu+TzYcRDQNgTdt7Rxrymitl
// SIG // NLF1YkPsaUH2QAddrqYoqyMXtEuC0tUz88y4huI95/va
// SIG // frSmBRm9aIlpHbHSZrlZWMHGseKFPoKJP0AL7x49Fp8X
// SIG // 0lNdLaboWd2WPLbMpqpXUnUk4izy3Wh6Dq/wrLZaC1Ji
// SIG // I5JYfgO3NZE+ogPt/RT9xiuldSipQTrRvHEhx/V1so0g
// SIG // PLEoIlQtEqgyhyog0kBdbaK1qc2eYc6LDHwnH+3qP/4U
// SIG // Ccy+glGtpKgJeExvFydDrzPnpz0x1koLSElvEVSypNjf
// SIG // /Tw+AMnMCQmBd4QyftdR0JjAfo4ZiL6pBrdRHaOHtdsX
// SIG // MpjdM4M6c5DDGgitGovL2DgBttHW/xB7TbsEbbFMRPHh
// SIG // Z/AHw1Exn+qQOKjrI8Flvuwqa0gueLv+zsP5ZqEkUS50
// SIG // Sz+0B6oTN/U5wWTaodxKHoWyl/rd0CpmcnXRGCWDzRVk
// SIG // f4OpGI9GtuOA0Z50QkaC1cPYzwZ/6oIyFZl3Rg5mQRjL
// SIG // xbG6cgfizBAvt3QLBluA5aqULgItN94bp9YpQ1qodZhd
// SIG // 7EapbjN7mWKmR2sNwKKFPmehEY8/Tg5a7htIYEkKuQzG
// SIG // 2+xYYtE/QZWr9aBugKmsl3STR/wL9HZOsaq7ZAjLjAlB
// SIG // MY1RxbEIeAwZaKiK
// SIG // End signature block
