import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//@ts-ignore
import path, {resolve} from 'path';
 
//@ts-ignore
const root = resolve(__dirname, 'src');

export default defineConfig({
	server: {
		port: 5175
	},
	plugins: [react()],
	build: {
		outDir: 'build'
	},
	resolve: {
		alias: {
		  '@routes': path.resolve(root, 'routes'),
		  '@pages': path.resolve(root, 'pages'),
		  '@assets': path.resolve(root, 'assets'),
		  '@components': path.resolve(root, 'components'),
		  '@Features': path.resolve(root, 'Features'),
		  '@student': path.resolve(root, 'features/student'),
		  '@utils': path.resolve(root, 'utils'),
		  '@types': path.resolve(root, 'types')
		}
	}
});
