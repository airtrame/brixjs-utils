import { TrameActorReturn } from "./interfaces/interfaces";


export function getInstructionValue(param : string, context? : any) {
    if (param.startsWith("!")) {
      const split = param.split(".");
      let reference = context.event;
      const splitKeys = split.slice(1);
  
      for (const key of splitKeys) {
        try {
          reference = reference[key];
        } catch (error) {
          return `${key} doesn't exist in event`;
        }
      }
      return reference;
    } else if (param.startsWith("$")) {
      const split = param.split(".");
      let reference = context.references[split[0]];
      const splitKeys = split.slice(1);
  
      for (const key of splitKeys) {
        try {
          reference = reference[key];
        } catch (error) {
          return `${key} doesn't exist in ${param}`;
        }
      }
      return reference;
    } else {
      return param;
    }
}

/**
 * Executes a fallback skill if the provided response indicates an error.
 * @param res - The response to check for errors.
 * @param  skill - The fallback skill to execute if an error occurs.
 * @returns The result of the skill if an error occurred, or null otherwise.
 */
export async function handleError(res : TrameActorReturn,skill : () => Promise<TrameActorReturn>){
  if(res[1]>299){
    return await skill()
  }
  return null;
}
/**
 * Creates an instruction object with a specified name and parameter.
 * This function is used to pass instruction to skill.
 * It allows dynamic creation of instruction objects with strongly typed keys.
 * @param {T} instructionName - The name of the instruction (e.g., "PERSON").
 * @param {string} instructionParam - The parameter value for the instruction.
 * @returns {{ [K in T]: string }} - An object with a single property, where the key is the instruction name
 */
export function WITH<T extends string>(instructionName: T, instructionParam: string): { [K in T]: string } {
  const instruction = { [instructionName]: instructionParam } as { [K in T]: string };
  return instruction;
}