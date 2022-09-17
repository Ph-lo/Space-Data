/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images2.imgbox.com', 'i.imgur.com', 'imgur.com'],
  },
  env: {
    ACCESS_TOKEN: "pk.eyJ1IjoicGgtbG8iLCJhIjoiY2w4NXplazJ3MDg2bjNubWg3Z3hib3RzeiJ9.kyhRKQvLXdYv0jdqqo-14g",
  }
}

