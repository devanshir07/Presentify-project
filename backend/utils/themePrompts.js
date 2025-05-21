const themePrompts = {
  modern: {
    name: "Modern Minimal",
    description: "Clean, minimal design with ample white space and sans-serif typography",
    prompt: `Create a modern minimal presentation with:
      - Clean sans-serif typography (Helvetica, Arial)
      - Minimalist layout with abundant white space
      - Monochromatic color scheme with selective accent colors
      - Subtle shadows and elegant transitions
      - Simple geometric icons and infographics
      - Asymmetrical layouts with strategic alignment
      - Color palette: (#FFFFFF, #F5F5F5, #333333, #4285F4)`,
    preview: "modern-theme.jpg"
  },
  
  corporate: {
    name: "Corporate Professional",
    description: "Polished business style with traditional layouts and professional color schemes",
    prompt: `Create a corporate professional presentation with:
      - Professional serif and sans-serif font combination
      - Traditional grid-based layouts with clear hierarchy
      - Navy blue, gray, and white color scheme with gold accents
      - Subtle gradients and clean borders
      - Business-appropriate icons and data visualization
      - Conservative transitions and animations
      - Color palette: (#003366, #FFFFFF, #CCCCCC, #E6B800)`,
    preview: "corporate-theme.jpg"
  },
  
  creative: {
    name: "Creative Bold",
    description: "Vibrant, expressive design with bold colors and dynamic layouts",
    prompt: `Create a creative bold presentation with:
      - Expressive typography with display fonts
      - Bold, contrasting color combinations
      - Asymmetrical, dynamic layouts
      - Artistic image treatments (duotones, overlays)
      - Creative icons and illustrations
      - Energetic transitions and animations
      - Color palette: (#FF416C, #FF4B2B, #2C3E50, #FFFFFF)`,
    preview: "creative-theme.jpg"
  },
  
  dark: {
    name: "Dark Mode",
    description: "Sleek dark backgrounds with high contrast elements for modern appeal",
    prompt: `Create a dark mode presentation with:
      - Dark backgrounds (#121212, #1F1F1F) with high contrast elements
      - Glowing accent colors on dark backgrounds
      - Clean sans-serif typography in white or light colors
      - Subtle gradients and depth elements
      - Neon accents and glowing edges for emphasis
      - Smooth fade transitions between slides
      - Color palette: (#121212, #FFFFFF, #BB86FC, #03DAC6)`,
    preview: "dark-theme.jpg"
  },
  
  nature: {
    name: "Nature Inspired",
    description: "Organic design with earthy colors and natural imagery",
    prompt: `Create a nature-inspired presentation with:
      - Organic shapes and flowing layouts
      - Earth tones and natural color schemes
      - Nature-inspired imagery and background textures
      - Rounded corners and soft shadows
      - Balanced asymmetry mimicking natural environments
      - Gentle slide transitions
      - Color palette: (#4B7F52, #8BB174, #F1F7ED, #5D5C61)`,
    preview: "nature-theme.jpg"
  },
  
  techFuturistic: {
    name: "Tech Futuristic",
    description: "Forward-looking design with digital aesthetics and tech-inspired elements",
    prompt: `Create a tech futuristic presentation with:
      - Monospace or ultra-modern sans-serif typography
      - Dark or gradient backgrounds with glowing elements
      - Geometric line patterns and tech-inspired motifs
      - Blueprint-style graphics or circuit board elements
      - Data visualization components
      - Digital transitions (glitch, scan lines)
      - Color palette: (#050A30, #000C66, #0000FF, #7EC8E3)`,
    preview: "tech-theme.jpg"
  }
};

module.exports = themePrompts;