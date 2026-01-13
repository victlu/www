/* tslint:disable */
/* eslint-disable */
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
 */
export function validate(transformation_json: string): string;
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
 */
export function get_metadata(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly validate: (a: number, b: number, c: number) => void;
  readonly get_metadata: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_0: (a: number, b: number) => number;
  readonly __wbindgen_export_1: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
