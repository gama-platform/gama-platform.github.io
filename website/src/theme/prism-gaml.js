Prism.languages.gaml = {
	'comment': [
		{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 }, 
		{ pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }],
	'string': 
		{ pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
	'number': [
		{
			pattern: /\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[+-]?\d(?:_?\d)*)?/i
		},
		{
			pattern: /\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[+-]?\d(?:_?\d)*)?\b/i
		}
	],
	'attribute': {
		pattern: /\b'\w+/,
		alias: 'attr-name'
	},
	'keyword': /\b(?:species|global|grid|model|import|output|action|add|agents|annealing|ask|aspect|assert|break|camera|capture|chart|conscious_contagion|create|data|datalist|default|diffuse|display|display_grid|display_population|do|draw|else|emotional_contagion|enter|equation|error|event|exhaustive|exit|experiment|export|focus|focus_on|genetic|graphics|highlight|hill_climbing|if|image|inspect|layout_forceatlas2|layout_yifanhu|let|light|loop|match|migrate|monitor|output|output_file|overlay|parameter|pause_sound|perceive|permanent|plan|put|reactive_tabu|reflex|release|remove|resume_sound|return|rule|run|save|save_batch|set|setup|simulate|solve|species|start_sound|state|status|stop_sound|switch|tabu|task|test|trace|transition|unconscious_contagion|user_command|user_init|user_input|user_panel|using|Variable_container|Variable_number|Variable_regular|warn|write|init)\b/i,
	'boolean': /\b(?:false|true)\b/i,
	'operator': /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
	'punctuation': /\.\.?|[,;():]/,
	'char': /'.'/,
	'variable': /\b[a-z](?:\w)*\b/i
};
