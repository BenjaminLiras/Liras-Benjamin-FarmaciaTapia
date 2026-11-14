import { defineConfig } from 'vite';

const proxy = { '/api': 'http://localhost:3000' };

export default defineConfig({ server: { proxy }, preview: { proxy } });
