import stylistic from '@stylistic/eslint-plugin';

export default [
	{
		ignores: ['node_modules/**', 'dist/**', '.history/**'],

		// Rules to apply.
		rules: {
			'@stylistic/semi': ['error', 'always'],
			'no-unused-vars': 'error',
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/spaced-comment': ['error', 'always'],
			'@stylistic/keyword-spacing': ['error', { 'before': true }],
			'@stylistic/quotes': ['error', 'single', { 'avoidEscape': true }],
			'@stylistic/space-before-blocks': ['error', 'always'],
			'@stylistic/space-infix-ops': 'error',
			'@stylistic/brace-style': ['error', '1tbs'],
			'@stylistic/comma-style': ['error', 'last'],
			'@stylistic/no-trailing-spaces': 'error',
			'@stylistic/space-before-function-paren': ['error', 'never'],
			'@stylistic/no-multi-spaces': 'error',
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
			'@stylistic/eol-last': ['error', 'always']
		},
		plugins: {
			'@stylistic': stylistic
		}
	}
];
