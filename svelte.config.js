// import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	// Consult https://svelte.dev/docs/kit/integrations
// 	// for more information about preprocessors
// 	preprocess: vitePreprocess(),

// 	kit: {
// 		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
// 		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
// 		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
// 		adapter: adapter()
// 	}
// };

// export default config;

// svelte.config.js
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
  kit: {
    adapter: adapter({
      // SPA挙動でルーティングしたいなら 404.html を fallback に（任意）
      fallback: '404.html'
    }),
    paths: {
      // プロジェクトページは本番で /<repo> を付ける
      base: dev ? '' : '/hello_ai_app'
    }
  }
};
