let context : any = {
    "actions": [], 
    "references": {},
    "event": null,
    "end": null,  
    "map": {}
}
let global_map : any = null

export function execute_script(event : any, script : string,global : any) {
    context["event"] = event
    global_map = global

    const lines = script_to_lines(script)

    lines.forEach((line) => {
        parseLine(line)
    });
    execute_context()
}
function script_to_lines(script : string) {
    let lines = script.split('\n')
    lines = lines.map(line => line.trim());
    return lines
}
function parseLine(line : string) {
    // Détermine le type de commande et extrait la commande brute, puis la stocke dans le contexte.
    line = line.trim();

    // Rechercher les références dans la ligne (avant traitement)
    const references = line.match(/\$([^=]+)=/g);

    // Vérifier qu'il n'y a qu'une seule référence
    if (references && references.length > 1) {
        return { type: "error", message: "Only one reference per line is allowed." };
    }

    // Si la ligne contient une référence, l'ajouter au contexte
    let ref = null;
    if (references && references.length === 1) {
        ref = references[0].replace('=', ''); // Supprimer le '='
        ref = ref.replace(/ /g, ''); // Supprimer les espaces
        context.references[ref] = null;
    }

    if (line.startsWith("=>")) { // Action
        let command = line.slice(2).trim();
        command = command.replace(/\$([^=]+)=/g, "").trim(); // Enlever les références
        context.actions.push({ command: command, reference: ref, next: null, error: null, status: null }); // Stocker la commande sans référence
    } else if (line.startsWith("DEFINE")) {
        const token = extractParenthesesContent(line)
        const actor = line.split(' ')[1]
        context['map'][actor] = global_map[token!]
    }
    else if (line.startsWith("END")) {
        const command = line.slice(3).trim();
        context.end = { command: command, next: null, error: null }; // Stocker la commande de fin
    } else {
        return { type: "unknown", command: line, next: null };
    }
}
function extractParenthesesContent(inputString : string) {
    const regex = /\(([^)]+)\)/; // Expression régulière pour trouver le contenu entre parenthèses
    const match = inputString.match(regex);

    if (match) {
        return match[1]; // Retourne le contenu capturé (le premier groupe de capture)
    } else {
        return null; // Retourne null si aucune correspondance n'est trouvée
    }
}
function executeAction(command : string) {
    const parsedCommand = parseCommand(command);
    if (context['map'][parsedCommand.actor!][parsedCommand.action!]) {

        return context['map'][parsedCommand.actor!][parsedCommand.action!](parsedCommand.instructions, context);
    } else {
        return { error: "Action not found" };
    }
}
function parseCommand(command : string) {
    command = command.trim();

    // Ajuster le pattern pour prendre en compte les instructions comme AT(!.email) ou DATA(@record.data)
    const pattern = /^(?<actor>[^:]+):(?<action>[^ ]+) (?<instructions>.+)$/;
    const match = command.match(pattern);

    if (match) {
        const actor = match.groups!.actor; // Avant le premier ':'
        const action = match.groups!.action; // Entre les ':' et l'espace
        const instructionsText = match.groups!.instructions;

        // Extraire toutes les instructions sous la forme NOM_INSTRUCTION(paramètre)
        const instructions = instructionsText.matchAll(/([A-Z]+)\(([^)]+)\)/g);

        // Convertir en tableau [{instruction: valeur}]
        const instructionsList : any = {};
        for (const inst of instructions) {
            instructionsList[inst[1]] = inst[2];
        }

        return {
            actor: actor,
            action: action,
            instructions: instructionsList,
        }
    } else {
        return { error: "Invalid command format" }
    }
}
 function execute_context() {
    context['actions'].forEach((action : any) => {
        const res = executeAction(action['command'])
        action['status'] = 200
        action['next'] = res
        if (action['reference']) {
            context['references'][action['reference']] = res
        }
    });
    console.log(context)
}