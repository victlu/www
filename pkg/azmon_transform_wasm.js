let wasm;

let heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

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
        const ptr0 = passStringToWasm0(transformation_json, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
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
    imports.wbg.__wbg_getTime_6bb3f64e0f18f817 = function(arg0) {
        const ret = getObject(arg0).getTime();
        return ret;
    };
    imports.wbg.__wbg_log_6c7b5f4f00b8ce3f = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbg_new0_b0a0a38c201e6df5 = function() {
        const ret = new Date();
        return addHeapObject(ret);
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
// SIG // MIIo2AYJKoZIhvcNAQcCoIIoyTCCKMUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // lJtTRM2S7z3db+zWtD50OjwqyhNf1emCCTat79gX2zCg
// SIG // gg3DMIIGrTCCBJWgAwIBAgITMwAAAK5/ZNbWLDH+CQAA
// SIG // AAAArjANBgkqhkiG9w0BAQwFADBiMQswCQYDVQQGEwJV
// SIG // UzEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MTMwMQYDVQQDEypBenVyZSBSU0EgUHVibGljIFNlcnZp
// SIG // Y2VzIENvZGUgU2lnbmluZyBQQ0EwHhcNMjUwNjE5MTg1
// SIG // NTU4WhcNMjYwNjE3MTg1NTU4WjCBgjELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEsMCoGA1UEAxMjQXp1cmUgUHVibGljIFNl
// SIG // cnZpY2VzIFJTQSBDb2RlIFNpZ24wggGiMA0GCSqGSIb3
// SIG // DQEBAQUAA4IBjwAwggGKAoIBgQCEcvSWr/qo67Cim1XM
// SIG // timpnEtj5rHnm0af48mDTtLaCwdLNEDfEPfSwwyLQIJY
// SIG // YtKRfyB9XaYKiUNr5ugPoeJ9LAtgIwkJFRfknIFTF5n+
// SIG // fWYMjBV6yNoTk4of+XTzgm4Vv7ueYPHMWygOEaAvBJwL
// SIG // wEc3zoabT0xd8tj7Gr5/MJ9s8Dzlzc4WZdnDTGZDCYLj
// SIG // c6B9Js1CjJVGzvGtqQRI/+Gf7xihho5YqFV+nIuvvivp
// SIG // mGpa/h1RAm1PfjBS/orol/xxP4DAZdLyXzPTDDllSbG9
// SIG // iV9RWH+IAVCDa033CRKFz7cAoihODnMtvGOKjnpebpT+
// SIG // Zp77dJ3ablhwjTaNOYHnNASR1jHytkIpq7QHe1YtowJB
// SIG // vNA4DbUb7jbbp72+/aGKPxBiprw+VEOSQGaEUxmLrmRu
// SIG // SYslI/FyoRv+M9OYhvFGqpyAlXYbjhqvQH9SbbmzrGOT
// SIG // 3+bHhI7aY4j5+vRYhEjf1cImhc94Z6mlH826sxBTynQ6
// SIG // purQnJhV3wcCAwEAAaOCAbkwggG1MA4GA1UdDwEB/wQE
// SIG // AwIHgDAfBgNVHSUEGDAWBggrBgEFBQcDAwYKKwYBBAGC
// SIG // N1sBATAdBgNVHQ4EFgQUvZt5LW7YxIxZozGmGbzpt2/x
// SIG // /uQwRQYDVR0RBD4wPKQ6MDgxHjAcBgNVBAsTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjEWMBQGA1UEBRMNNDY5OTgx
// SIG // KzUwNTI5MjAfBgNVHSMEGDAWgBTxL7qRFnzefVInMfV6
// SIG // +9VYWWk6PTBvBgNVHR8EaDBmMGSgYqBghl5odHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NybC9BenVy
// SIG // ZSUyMFJTQSUyMFB1YmxpYyUyMFNlcnZpY2VzJTIwQ29k
// SIG // ZSUyMFNpZ25pbmclMjBQQ0EuY3JsMHwGCCsGAQUFBwEB
// SIG // BHAwbjBsBggrBgEFBQcwAoZgaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tL3BraW9wcy9jZXJ0cy9BenVyZSUyMFJT
// SIG // QSUyMFB1YmxpYyUyMFNlcnZpY2VzJTIwQ29kZSUyMFNp
// SIG // Z25pbmclMjBQQ0EuY3J0MAwGA1UdEwEB/wQCMAAwDQYJ
// SIG // KoZIhvcNAQEMBQADggIBAB6iDekXuQ3Ve08WQQMuvXvE
// SIG // RkA0q4Epf158VfZthQeZ5eej1Fv0AWTfxnuO8p49Slkg
// SIG // 811U5Uuruo3aMthdfMqgv6Y2lZfX35mrcOUNu3UviCqY
// SIG // 0pUQmFdz30hpHca3uAen6vVzXVuiNa5yNJ5rG8omFx5m
// SIG // jWHHysIIOyCuBc21scassJN0xjom2lX6sMHGh7XW/aah
// SIG // 0CbecyaowoxRWYPQFrFDUq5cplijNgyirPXlCrJXBNTZ
// SIG // kIFPtiBSJJMoXlvkU+1H0xVcJ6kUw9qOoAdxNuI5hAvL
// SIG // GIft1tvfL3mljW4zFWjvhgkTszpQNbgqEJEs6W9c/y3C
// SIG // Z1hoGOGFcuMgLSkrzz9FjR6r8QDwvu5gmAC4eaZQv5Vm
// SIG // EF0DK56h8UiIIfMdEQCuOAUVZZBuLGE5ARX8anViTAyA
// SIG // WrbyqpeGwQtgKwJGPwrBX+cSEFeHJvONbN/EyhgQdFK+
// SIG // C8b0SC/idqhurBJCipHgNeC6SpHyxFBd7vOYsj2S3Ux5
// SIG // aVf4yKLyy3LtnAzW/OglurPTlKY35UNep8cnRXziuIj8
// SIG // 2K9DxmQI2tfCpbNrP6gf5893tZ3z/zojMIy0PcmgGSgt
// SIG // euCJajA2sKym9FaRed5UGXFKzUVNBDbd5YLL4rc92U+V
// SIG // oUhOJ5ZwPpIlhNCShERT/jRRg0cGjUQ+iYF1mdIbiArq
// SIG // MIIHDjCCBPagAwIBAgITMwAAAAKyxJOIeFns0wAAAAAA
// SIG // AjANBgkqhkiG9w0BAQwFADBbMQswCQYDVQQGEwJVUzEe
// SIG // MBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSww
// SIG // KgYDVQQDEyNNaWNyb3NvZnQgUlNBIFNlcnZpY2VzIFJv
// SIG // b3QgQ0EgMjAyMTAeFw0yMTA5MDIxNzQxMTlaFw0zNjA5
// SIG // MDIxNzUxMTlaMGIxCzAJBgNVBAYTAlVTMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xMzAxBgNVBAMT
// SIG // KkF6dXJlIFJTQSBQdWJsaWMgU2VydmljZXMgQ29kZSBT
// SIG // aWduaW5nIFBDQTCCAiIwDQYJKoZIhvcNAQEBBQADggIP
// SIG // ADCCAgoCggIBAKXd/Sy91nFgseVJOFgeRhVxrcahyp1Y
// SIG // GSN0FpOEgEREVb3ND/QgI7I0yd7XG6OE8Vomr5FMxvK8
// SIG // TvJ4Lc6LP9BDz2GSa1M0LlzHKX757/24C0ZndzccA1qQ
// SIG // i00+BmmOr4plmxRzTFv4Phdw8yBPF9GDvClqV8ASvvbi
// SIG // tfjaD7dVPOFLb7N7fvt/qWogGN5eis0FXCqVJdmPZZaX
// SIG // 2h4iG0otsAhfq8yvSlJ0YwO4i5GDeLQwTsMN1Rf2UAHQ
// SIG // KCUYkFsLSQ0mqbaRbDZhB+2pFL/q/c2a6hlHLnapYyfw
// SIG // lNFXkDhwAFWEzfwFHER2oR42UayfN9tsO/p2tWk33Crn
// SIG // HdndJDrIZ6oQ3D+Ngol/TR8BAgXCIM6se6YlLDTsxRwh
// SIG // 9QUDq7KVhKy58HGKJUqwgIW0E7cvlzUl0Hft/ebhALZy
// SIG // FDkhof9C5Cq4c/486XLjQq0nbuKsFNhQU0yvABR3eohw
// SIG // 63Kps66Uma48oE0JmqOxmzrPvrITYcsnByKleiHn+4yq
// SIG // +Ts/KrtqkQwQcuikMPrZwXCtsYkxMUyUn8gr8oew22WD
// SIG // eIQECAM1Cz9TcdJadsrToKqXQa2bAn/AABAYyogPPONf
// SIG // GvojTI3DlYD42etMa/gPeZJavX+z7x8d/4eYBnJ9WFSi
// SIG // 9q0v+vLOGc3fyM2KQtq5eVbHX5rVyWc6bJ35AgMBAAGj
// SIG // ggHCMIIBvjAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4E
// SIG // FgQU8S+6kRZ83n1SJzH1evvVWFlpOj0wVAYDVR0gBE0w
// SIG // SzBJBgRVHSAAMEEwPwYIKwYBBQUHAgEWM2h0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvRG9jcy9SZXBv
// SIG // c2l0b3J5Lmh0bTAZBgkrBgEEAYI3FAIEDB4KAFMAdQBi
// SIG // AEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB
// SIG // /zAfBgNVHSMEGDAWgBQODLFkab0tsdVrJqZH6lZOgMPt
// SIG // ijBmBgNVHR8EXzBdMFugWaBXhlVodHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQl
// SIG // MjBSU0ElMjBTZXJ2aWNlcyUyMFJvb3QlMjBDQSUyMDIw
// SIG // MjEuY3JsMHMGCCsGAQUFBwEBBGcwZTBjBggrBgEFBQcw
// SIG // AoZXaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9w
// SIG // cy9jZXJ0cy9NaWNyb3NvZnQlMjBSU0ElMjBTZXJ2aWNl
// SIG // cyUyMFJvb3QlMjBDQSUyMDIwMjEuY3J0MA0GCSqGSIb3
// SIG // DQEBDAUAA4ICAQBin7PMBnXjnIJ0x++LnudLDWWnZ8dZ
// SIG // mJ14DuZfUss/doUThLAM4crrHaTbJoulUUELNd2AnOpX
// SIG // /Z4tenUMT3sjYIdPYyJfIYWPRqfI6Nbz+JVK7RRvn2nl
// SIG // 5EEMIuRE6UKS9ZGBbf02a7sb04E/7BN/NhhrmtS/tVFj
// SIG // fRrrVh9zXku45rqWuCwUTzg3EqxKQ8OGbtjBQtq/Syb/
// SIG // clm5BHsoh3XhMnb9VLv3G1duNf90FL5/o88XZ4L18nx1
// SIG // lfky2nllY4HIA8PK8AarqAW4iKSTA3EGqn8s/47WtQKT
// SIG // +qED2YbZXVOYL+L7vQDCnFbwhgAx6ucuMz7Ae1rqibg3
// SIG // AjsC7U5M3oA/vqAHDKDA3mdM5D6L/ZEdQgaG20HhUOSQ
// SIG // +CiQD3TyHSiVCfVMuTv83IiKCni3LW/23tHC2tbN57rl
// SIG // hMcoyjIi+IVd7j7s41MFBaDwJrmfXn/YM+lR/5QqvO7z
// SIG // WAbbr/XU531v3jr/jBilmrqt6U/b7y8TXyA9nYxV9iSM
// SIG // FmcbyIi2xgdcAHhxnpXcvcvyFWET6YiJiyeSJZwwJv8g
// SIG // wXiBF+Zh0IHArl6KVsbAdsATuP1TCEBpPynXZmkviIEW
// SIG // Ptnv315ZjTC7nPoOpSnOVaO7wZztrOefZunI5fBxw7mG
// SIG // 1oyoRnADZawiFsVo9J/cDu15ErRCfDQRhwSiBTGCGm0w
// SIG // ghppAgEBMHkwYjELMAkGA1UEBhMCVVMxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEzMDEGA1UEAxMq
// SIG // QXp1cmUgUlNBIFB1YmxpYyBTZXJ2aWNlcyBDb2RlIFNp
// SIG // Z25pbmcgUENBAhMzAAAArn9k1tYsMf4JAAAAAACuMA0G
// SIG // CWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCAO5xvK13GXEd21
// SIG // XcHehMekZ3T5I/g0cIZCUowyJRUogTBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBgFqwKlaDEiQBhlPbDjt3jtpiQLBn/m9b
// SIG // +rCgxXY38VhwU3/4d7HGsCGyWcRVWtte43tvUJ/AHgJf
// SIG // bqbNiXwmocbuFcNa2mXV+uT+/N8DyIcK47Cym78Z4Doa
// SIG // bQqv/Tne9952YsWP5CqxOQ6rtz0V4mIdQT9R3bmwhVF6
// SIG // tnUuSGn+sRS8k9unSPiz3HLwDOj/axD0ybVu+oed8mH5
// SIG // oD+PXhwjFs2gzz7tz3fxJd4aR6N7wIXNvOtR48D73wRM
// SIG // yaY3gCqWKwMZRgF28hx6McnaGby20F1cw9Mwv986rTtw
// SIG // wq2pvHTgAHABTIo+WG9PBc1TNH8posRD7lWU0kYil9Ee
// SIG // 7fr7M2v1eZpf0aBYo6zE/JJIIje2ZIkWDlpAlpRvbHEB
// SIG // 31SyV8aeezWP4RlbDk5X56kXDjTWlZnXMpH9cTfvQUx9
// SIG // 6SH2sPLF2dVKDRgksPpv52jBhrASWi/n2yTiSf1aTMW5
// SIG // Mt0SaBxFR9+IF2B3ogwbk+f3GhV+MxoB1fzK/PVzWqGC
// SIG // F5QwgheQBgorBgEEAYI3AwMBMYIXgDCCF3wGCSqGSIb3
// SIG // DQEHAqCCF20wghdpAgEDMQ8wDQYJYIZIAWUDBAIBBQAw
// SIG // ggFSBgsqhkiG9w0BCRABBKCCAUEEggE9MIIBOQIBAQYK
// SIG // KwYBBAGEWQoDATAxMA0GCWCGSAFlAwQCAQUABCB0PHJS
// SIG // Ry8QLoovCQg6iHVkEtFIknFXlz/54FnKc9liCgIGaZRZ
// SIG // q/i8GBMyMDI2MDMwNjIwMDA0OS4xNjRaMASAAgH0oIHR
// SIG // pIHOMIHLMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSUwIwYDVQQL
// SIG // ExxNaWNyb3NvZnQgQW1lcmljYSBPcGVyYXRpb25zMScw
// SIG // JQYDVQQLEx5uU2hpZWxkIFRTUyBFU046QTkzNS0wM0Uw
// SIG // LUQ5NDcxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFNlcnZpY2WgghHqMIIHIDCCBQigAwIBAgITMwAA
// SIG // Agy5ZOM1nOz0rgABAAACDDANBgkqhkiG9w0BAQsFADB8
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNy
// SIG // b3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDAeFw0yNTAx
// SIG // MzAxOTQzMDBaFw0yNjA0MjIxOTQzMDBaMIHLMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSUwIwYDVQQLExxNaWNyb3NvZnQg
// SIG // QW1lcmljYSBPcGVyYXRpb25zMScwJQYDVQQLEx5uU2hp
// SIG // ZWxkIFRTUyBFU046QTkzNS0wM0UwLUQ5NDcxJTAjBgNV
// SIG // BAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2Uw
// SIG // ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDK
// SIG // AVYmPeRtga/U6jzqyqLD0MAool23gcBN58+Z/XskYwNJ
// SIG // sZ+O+wVyQYl8dPTK1/BC2xAic1m+JvckqjVaQ32KmURs
// SIG // EZotirQY4PKVW+eXwRt3r6szgLuic6qoHlbXox/l0HJt
// SIG // gURkzDXWMkKmGSL7z8/crqcvmYqv8t/slAF4J+mpzb9t
// SIG // MFVmjwKXONVdRwg9Q3WaPZBC7Wvoi7PRIN2jgjSBnHYy
// SIG // AZSlstKNrpYb6+Gu6oSFkQzGpR65+QNDdkP4ufOf4PbO
// SIG // g3fb4uGPjI8EPKlpwMwai1kQyX+fgcgCoV9J+o8MYYCZ
// SIG // Uet3kzhhwRzqh6LMeDjaXLP701SXXiXc2ZHzuDHbS/sZ
// SIG // tJ3627cVpClXEIUvg2xpr0rPlItHwtjo1PwMCpXYqnYK
// SIG // vX8aJ8nawT9W8FUuuyZPG1852+q4jkVleKL7x+7el8ET
// SIG // ehbdkwdhAXyXimaEzWetNNSmG/KfHAp9czwsL1vKr4Rg
// SIG // n+pIIkZHuomdf5e481K+xIWhLCPdpuV87EqGOK/jbhOn
// SIG // ZEqwdvA0AlMaLfsmCemZmupejaYuEk05/6cCUxgF4zCn
// SIG // kJeYdMAP+9Z4kVh7tzRFsw/lZSl2D7EhIA6Knj6RffH2
// SIG // k7YtSGSv86CShzfiXaz9y6sTu8SGqF6ObL/eu/DkivyV
// SIG // oCfUXWLjiSJsrS63D0EHHQIDAQABo4IBSTCCAUUwHQYD
// SIG // VR0OBBYEFHUORSH/sB/rQ/beD0l5VxQ706GIMB8GA1Ud
// SIG // IwQYMBaAFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMF8GA1Ud
// SIG // HwRYMFYwVKBSoFCGTmh0dHA6Ly93d3cubWljcm9zb2Z0
// SIG // LmNvbS9wa2lvcHMvY3JsL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNybDBsBggrBgEF
// SIG // BQcBAQRgMF4wXAYIKwYBBQUHMAKGUGh0dHA6Ly93d3cu
// SIG // bWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWljcm9z
// SIG // b2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAoMSku
// SIG // Y3J0MAwGA1UdEwEB/wQCMAAwFgYDVR0lAQH/BAwwCgYI
// SIG // KwYBBQUHAwgwDgYDVR0PAQH/BAQDAgeAMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQDZMPr4gVmwwf4GMB5ZfHSr34uhug6y
// SIG // zu4HUT+JWMZqz9uhLZBoX5CPjdKJzwAVvYoNuLmS0+9l
// SIG // A5S74rvKqd/u9vp88VGk6U7gMceatdqpKlbVRdn2ZfrM
// SIG // cpI4zOc6BtuYrzJV4cEs1YmX95uiAxaED34w02BnfuPZ
// SIG // XA0edsDBbd4ixFU8X/1J0DfIUk1YFYPOrmwmI2k16u6T
// SIG // cKO0YpRlwTdCq9vO0eEIER1SLmQNBzX9h2ccCvtgekOa
// SIG // BoIQ3ZRai8Ds1f+wcKCPzD4qDX3xNgvLFiKoA6ZSG9S/
// SIG // yOrGaiSGIeDy5N9VQuqTNjryuAzjvf5W8AQp31hV1GbU
// SIG // DOkbUdd+zkJWKX4FmzeeN52EEbykoWcJ5V9M4DPGN5xp
// SIG // FqXy9aO0+dR0UUYWuqeLhDyRnVeZcTEu0xgmo+pQHauF
// SIG // VASsVORMp8TF8dpesd+tqkkQ8VNvI20oOfnTfL+7ZgUM
// SIG // f7qNV0ll0Wo5nlr1CJva1bfk2Hc5BY1M9sd3blBkezyv
// SIG // JPn4j0bfOOrCYTwYsNsjiRl/WW18NOpiwqciwFlUNqtW
// SIG // CRMzC9r84YaUMQ82Bywk48d4uBon5ZA8pXXS7jwJTjJj
// SIG // 5USeRl9vjT98PDZyCFO2eFSOFdDdf6WBo/WZUA2hGZ0q
// SIG // +J7j140fbXCfOUIm0j23HaAV0ckDS/nmC/oF1jCCB3Ew
// SIG // ggVZoAMCAQICEzMAAAAVxedrngKbSZkAAAAAABUwDQYJ
// SIG // KoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // MjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRpZmlj
// SIG // YXRlIEF1dGhvcml0eSAyMDEwMB4XDTIxMDkzMDE4MjIy
// SIG // NVoXDTMwMDkzMDE4MzIyNVowfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTAwggIiMA0GCSqGSIb3DQEBAQUAA4IC
// SIG // DwAwggIKAoICAQDk4aZM57RyIQt5osvXJHm9DtWC0/3u
// SIG // nAcH0qlsTnXIyjVX9gF/bErg4r25PhdgM/9cT8dm95VT
// SIG // cVrifkpa/rg2Z4VGIwy1jRPPdzLAEBjoYH1qUoNEt6aO
// SIG // RmsHFPPFdvWGUNzBRMhxXFExN6AKOG6N7dcP2CZTfDlh
// SIG // AnrEqv1yaa8dq6z2Nr41JmTamDu6GnszrYBbfowQHJ1S
// SIG // /rboYiXcag/PXfT+jlPP1uyFVk3v3byNpOORj7I5LFGc
// SIG // 6XBpDco2LXCOMcg1KL3jtIckw+DJj361VI/c+gVVmG1o
// SIG // O5pGve2krnopN6zL64NF50ZuyjLVwIYwXE8s4mKyzbni
// SIG // jYjklqwBSru+cakXW2dg3viSkR4dPf0gz3N9QZpGdc3E
// SIG // XzTdEonW/aUgfX782Z5F37ZyL9t9X4C626p+Nuw2TPYr
// SIG // bqgSUei/BQOj0XOmTTd0lBw0gg/wEPK3Rxjtp+iZfD9M
// SIG // 269ewvPV2HM9Q07BMzlMjgK8QmguEOqEUUbi0b1qGFph
// SIG // AXPKZ6Je1yh2AuIzGHLXpyDwwvoSCtdjbwzJNmSLW6Cm
// SIG // gyFdXzB0kZSU2LlQ+QuJYfM2BjUYhEfb3BvR/bLUHMVr
// SIG // 9lxSUV0S2yW6r1AFemzFER1y7435UsSFF5PAPBXbGjfH
// SIG // CBUYP3irRbb1Hode2o+eFnJpxq57t7c+auIurQIDAQAB
// SIG // o4IB3TCCAdkwEgYJKwYBBAGCNxUBBAUCAwEAATAjBgkr
// SIG // BgEEAYI3FQIEFgQUKqdS/mTEmr6CkTxGNSnPEP8vBO4w
// SIG // HQYDVR0OBBYEFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMFwG
// SIG // A1UdIARVMFMwUQYMKwYBBAGCN0yDfQEBMEEwPwYIKwYB
// SIG // BQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTATBgNVHSUE
// SIG // DDAKBggrBgEFBQcDCDAZBgkrBgEEAYI3FAIEDB4KAFMA
// SIG // dQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUw
// SIG // AwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2UkFvX
// SIG // zpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3Js
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9N
// SIG // aWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYIKwYB
// SIG // BQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jvb0Nl
// SIG // ckF1dF8yMDEwLTA2LTIzLmNydDANBgkqhkiG9w0BAQsF
// SIG // AAOCAgEAnVV9/Cqt4SwfZwExJFvhnnJL/Klv6lwUtj5O
// SIG // R2R4sQaTlz0xM7U518JxNj/aZGx80HU5bbsPMeTCj/ts
// SIG // 0aGUGCLu6WZnOlNN3Zi6th542DYunKmCVgADsAW+iehp
// SIG // 4LoJ7nvfam++Kctu2D9IdQHZGN5tggz1bSNU5HhTdSRX
// SIG // ud2f8449xvNo32X2pFaq95W2KFUn0CS9QKC/GbYSEhFd
// SIG // PSfgQJY4rPf5KYnDvBewVIVCs/wMnosZiefwC2qBwoEZ
// SIG // QhlSdYo2wh3DYXMuLGt7bj8sCXgU6ZGyqVvfSaN0DLzs
// SIG // kYDSPeZKPmY7T7uG+jIa2Zb0j/aRAfbOxnT99kxybxCr
// SIG // dTDFNLB62FD+CljdQDzHVG2dY3RILLFORy3BFARxv2T5
// SIG // JL5zbcqOCb2zAVdJVGTZc9d/HltEAY5aGZFrDZ+kKNxn
// SIG // GSgkujhLmm77IVRrakURR6nxt67I6IleT53S0Ex2tVdU
// SIG // CbFpAUR+fKFhbHP+CrvsQWY9af3LwUFJfn6Tvsv4O+S3
// SIG // Fb+0zj6lMVGEvL8CwYKiexcdFYmNcP7ntdAoGokLjzba
// SIG // ukz5m/8K6TT4JDVnK+ANuOaMmdbhIurwJ0I9JZTmdHRb
// SIG // atGePu1+oDEzfbzL6Xu/OHBE0ZDxyKs6ijoIYn/ZcGNT
// SIG // TY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggNNMIICNQIB
// SIG // ATCB+aGB0aSBzjCByzELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEl
// SIG // MCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0
// SIG // aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOkE5
// SIG // MzUtMDNFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBTZXJ2aWNloiMKAQEwBwYFKw4DAhoD
// SIG // FQDvu8hkhEMt5Z8Ldefls7z1LVU8pqCBgzCBgKR+MHwx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jv
// SIG // c29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwMA0GCSqGSIb3
// SIG // DQEBCwUAAgUA7VU+2DAiGA8yMDI2MDMwNjExNTQwMFoY
// SIG // DzIwMjYwMzA3MTE1NDAwWjB0MDoGCisGAQQBhFkKBAEx
// SIG // LDAqMAoCBQDtVT7YAgEAMAcCAQACAhYsMAcCAQACAhJo
// SIG // MAoCBQDtVpBYAgEAMDYGCisGAQQBhFkKBAIxKDAmMAwG
// SIG // CisGAQQBhFkKAwKgCjAIAgEAAgMHoSChCjAIAgEAAgMB
// SIG // hqAwDQYJKoZIhvcNAQELBQADggEBAHKhFkhNE0Cita30
// SIG // V6poJfe5i6qWK3Jfuwj0uZvsdO09CQSsK61inwP2U+qu
// SIG // 5LEiJXKrgOGGZSLVxpKk9m6mJ5HWSzXWZjIP+vNGuYLX
// SIG // GTZjH7nWpGk6I3ywgXeOqX3K7xe18QQdFv/WYaJ4hXsy
// SIG // yXxaW30hK8AeAQSrTxqqJWUPtihAbpFIXUMPG/2615NP
// SIG // 3wk4GmHPXCgOe//c2cKDEBSk0y1ghbe6q4B+F8PhaOvE
// SIG // cRL4/DAzTi+Q3SA1y11w6BkMEtEgRaWMgwfUAy754IBZ
// SIG // N2ZnHbTAeJuXONkovrM7L+G34HlAKfqNOw78mPPKjkID
// SIG // iQvdkrx399zsRzjbmhgxggQNMIIECQIBATCBkzB8MQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAgy5ZOM1
// SIG // nOz0rgABAAACDDANBglghkgBZQMEAgEFAKCCAUowGgYJ
// SIG // KoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMC8GCSqGSIb3
// SIG // DQEJBDEiBCBpf/DMSLpemX+IRAjOnr2Eorro7cvU/0dj
// SIG // x76Z+1DLTjCB+gYLKoZIhvcNAQkQAi8xgeowgecwgeQw
// SIG // gb0EINUo17cFMZN46MI5NfIAg9Ux5cO5xM9inre5riuO
// SIG // Z8ItMIGYMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEm
// SIG // MCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
// SIG // IDIwMTACEzMAAAIMuWTjNZzs9K4AAQAAAgwwIgQgv4q6
// SIG // CWD804E5G8lhiLPg1q5iKFopXQMsuXWk+4gchuwwDQYJ
// SIG // KoZIhvcNAQELBQAEggIAGipuR47Atvteqo8YPvAi2U2P
// SIG // Ba6ifZyYALRV6dcvk7R1ITYxZEBXFbcYxUxqKwZsk1OJ
// SIG // YG5olpHog7tOkpjW5L4S6zQuCHxquSGZfcil/F0f9RLJ
// SIG // 0NvNB9eNUtfkKztTmG3c+7Xmo7IoIQTyplE9Do4mLz0z
// SIG // j6LfOUt/dDJqMy/Me9b6+Dwr+ZZXPPvGoNRYC5ruUJRW
// SIG // zixaA5dJ125g/oMgLJnMBl0VMVg1sIyP8jKgStE/aSdL
// SIG // MDI82sXQZ3UehtiFwRP31SHtr4rPyRGyW98Fr915xhOF
// SIG // QlP3zyJASKsZ8SQRI4rWC+nFF90ohJGgnsWFYJolN9aN
// SIG // IBUrSTyY0IE4dQowz8DqOZq8wuN+nEiwOJui06ua+nNb
// SIG // d4I5LxSigyDTmborUfTYp6TLlYIc3cOkhJaD0L2MnMcN
// SIG // w/mgxlQN93P3a6y+otBI+npt7X7Pb/FImuAazOOQ1Ffc
// SIG // o/YjwHocnAmZxfHMQ2wY8g2MD58Lu+pBB97YxfWJcBKI
// SIG // 6DouzREyyzMI+IsBplLY2ck6OM+rJGNu5skZXp80wGza
// SIG // WhdNncLWic8K3DIPSWTm1IE6cFdnax7XNV1PVi2i9q34
// SIG // D1FMW84zfZHKYj+eywRHriVjhl2YQNOiNLgUbxMzVwQa
// SIG // M+4S9oROcZjjCkcTolArPofBn7Ji5KP3VOPfsV86nhs=
// SIG // End signature block
