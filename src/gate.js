(function (Utils) {
  "use strict";

  Utils.Gate = Object.freeze({
    isMermaidCode(codeText) {
      const validBaseTypes = new Set([
        "graph", "flowchart", "swimlane", "sequenceDiagram", "classDiagram", 
        "stateDiagram", "erDiagram", "journey", "gantt", "pie", 
        "quadrantChart", "requirementDiagram", "gitGraph", "C4Context", "mindmap", 
        "timeline", "zenuml", "sankey", "xychart", "block", 
        "packet", "kanban", "architecture", "radar", "eventmodeling", 
        "treemap", "venn", "ishikawa", "wardley", "cynefin", "treeView"
      ]);

      try {
        if (!codeText || typeof codeText !== "string") {
          console.warn("[isMermaidCode] Invalid input or non-string type:", codeText);
          return false;
        }

        const lines = codeText.split(/\r?\n/);
        let targetIndex = 0;

        if (lines[targetIndex] && lines[targetIndex].trim() === "---") {
          console.debug("[isMermaidCode] YAML frontmatter detected, parsing boundaries...");
          targetIndex++;
          let yamlClosed = false;
          while (targetIndex < lines.length) {
            if (lines[targetIndex].trim() === "---") {
              yamlClosed = true;
              targetIndex++;
              break;
            }
            targetIndex++;
          }
          if (!yamlClosed) {
            console.warn("[isMermaidCode] Missing closing '---' for YAML frontmatter.");
          }
        }

        while (targetIndex < lines.length && lines[targetIndex].trim() === "") {
          targetIndex++;
        }

        if (targetIndex >= lines.length) {
          console.debug("[isMermaidCode] Code block contains only empty lines.");
          return false;
        }

        const targetLine = lines[targetIndex].trim();
        const firstPartBySpace = targetLine.split(/\s+/)[0];
        const chartType = firstPartBySpace.split("-")[0];

        console.debug(`[isMermaidCode] Extracted base chart type: "${chartType}" (Original line: "${targetLine}")`);

        const isValid = validBaseTypes.has(chartType);
        if (!isValid) {
          console.debug(`[isMermaidCode] "${chartType}" is not a recognized Mermaid chart type.`);
        }

        return isValid;

      } catch (error) {
        console.error("[isMermaidCode] Unexpected exception occurred during evaluation:", error);
        return false;
      }
    }
  });

})(globalThis.Utils ??= {});
