/** @type {import('next').NextConfig} */
const process = require('process')
const path = require('path')

const {
	ENV_VAR,
	NEXT_PUBLIC_API_URL,
	NEXT_DEV_API_URL,
	NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
	NEXT_PUBLIC_URL,
	NEXT_DEV_URL
} = process.env

const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
	env: {
		ENV_VAR,
		NEXT_PUBLIC_API_URL,
		NEXT_DEV_API_URL,
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
		NEXT_PUBLIC_URL,
		NEXT_DEV_URL
	},
	async rewrites() {
		return {
			beforeFiles: [
				// These rewrites are checked after headers/redirects
				// and before all files including _next/public files which
				// allows overriding page files
				{
					source: '/some-page',
					destination: '/somewhere-else',
					has: [{type: 'query', key: 'overrideMe'}],
				},
			],
			afterFiles: [
				// These rewrites are checked after pages/public files
				// are checked but before dynamic routes
				{
					source: '/non-existent',
					destination: '/somewhere-else',
				},
			],
			fallback: [
				// These rewrites are checked after both pages/public files
				// and dynamic routes are checked
				{
					source: '/:path*',
					destination: `https://staging-backend.monetiseur.io/:path*`,
				},
			],
		}
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'monetiseur-stage-rights-holder-images.s3.amazonaws.com',
				port: '',
				pathname: '/**'
			}, {
				protocol: 'https',
				hostname: 'monetiseur-dev-rights-holder-images.s3.amazonaws.com',
				port: '',
				pathname: '/**'
			}, {
				protocol: 'https',
				hostname: 'monetiseur-stage-brand-images.s3.amazonaws.com',
				port: '',
				pathname: '/**'
			}, {
				protocol: 'https',
				hostname: 'monetiseur-dev-brand-images.s3.amazonaws.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'monetiseur-stage-product-images.s3.amazonaws.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'monetiseur-dev-product-images.s3.amazonaws.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'img.youtube.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'd14era5uajf9vg.cloudfront.net',
				port: '',
				pathname: '/**'
			}
		]
	},
	async headers() {
		return [
			{
				source: '/favicon.ico',
				headers: [
					{
						key: 'Link',
						value: '/favicon.jpeg',
					},
				],
			},
		]
	}
}

module.exports = nextConfig