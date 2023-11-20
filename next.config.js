/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'catering-app-fip8e.ondigitalocean.app',
				port: '',
				pathname: '/api/v1/files/**',
			},
		],
	},
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve(__dirname);
		return config;
	},
};
