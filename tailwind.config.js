import { transform } from 'lodash'
import { plugin } from 'postcss'
import { fadeIn } from 'src'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
