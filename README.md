# Sorting Visualizer

A fully responsive and interactive web application that visualizes various sorting algorithms with beautiful animations and real-time statistics.

## 🌟 Features

### Core Functionality
- **5 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort
- **Real-time Visualization**: Step-by-step animation of the sorting process
- **Interactive Controls**: Start, Pause, Reset, and Shuffle functionality
- **Custom Array Input**: Enter your own comma-separated numbers (up to 350 elements)
- **Random Array Generation**: Generate random arrays of varying sizes
- **Playback Speed Control**: 11 different speed options from 3x ultra fast to 0.1x extremely slow
- **Pseudo-code Copy**: Copy algorithm code to clipboard with one click

### User Experience
- **Light/Dark Theme Toggle**: Switch between themes with persistent storage
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradients, smooth animations, and hover effects
- **Real-time Statistics**: Track comparisons, swaps, and execution time

### Educational Features
- **Pseudo-code Display**: Shows the algorithm logic for each sorting method
- **Step-by-step Animation**: Visual representation of each algorithm's execution
- **Color-coded Bars**: Different colors for comparing, swapping, and sorted elements

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start exploring the sorting algorithms!

### Usage
1. **Select an Algorithm**: Choose from the dropdown menu
2. **Generate Array**: Click "Generate Random" for a new array or enter custom values
3. **Start Sorting**: Click "Start" to begin the visualization
4. **Control Playback**: Use Pause/Resume and Reset as needed
5. **Switch Themes**: Click the theme toggle button (🌙/☀️)

## 🎨 Design Features

### Visual Elements
- **Gradient Bars**: Beautiful color transitions for array elements
- **Smooth Animations**: CSS transitions and transforms for fluid movement
- **Responsive Layout**: Adapts to different screen sizes and orientations
- **Modern Typography**: Clean, readable fonts with proper hierarchy

### Color Scheme
- **Light Theme**: Clean whites and blues with subtle shadows
- **Dark Theme**: Deep blues and grays for comfortable viewing
- **Accent Colors**: Distinct colors for different actions and states

## 🔧 Technical Implementation

### Architecture
- **Modular JavaScript**: Clean, object-oriented code structure
- **CSS Variables**: Dynamic theming with CSS custom properties
- **Responsive Grid**: CSS Grid and Flexbox for layout
- **Async/Await**: Modern JavaScript for smooth animations

### Performance
- **Optimized Rendering**: Efficient DOM manipulation
- **Smooth Animations**: 100ms intervals between steps (configurable)
- **Memory Management**: Proper cleanup and state management

### Browser Compatibility
- **Modern Browsers**: Full support for Chrome, Firefox, Safari, Edge
- **CSS Features**: Uses modern CSS features with fallbacks
- **JavaScript ES6+**: Leverages modern JavaScript capabilities

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1200px+ - Full layout with side-by-side sections
- **Tablet**: 768px - 1199px - Adjusted spacing and button layout
- **Mobile**: 480px - 767px - Stacked layout with full-width buttons
- **Small Mobile**: <480px - Optimized for very small screens

### Mobile Optimizations
- Touch-friendly button sizes
- Optimized spacing for small screens
- Responsive array bar sizing
- Scrollable pseudo-code section

## 🎯 Sorting Algorithms

### Bubble Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Best For**: Educational purposes, small datasets

### Selection Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Best For**: Small datasets, minimizing swaps

### Insertion Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Best For**: Small datasets, nearly sorted arrays

### Merge Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- **Best For**: Large datasets, stable sorting

### Quick Sort
- **Time Complexity**: O(n log n) average, O(n²) worst case
- **Space Complexity**: O(log n)
- **Best For**: Large datasets, in-place sorting

## 🛠️ Customization

### Animation Speed
Modify the `animationSpeed` property in the JavaScript file:
```javascript
this.animationSpeed = 100; // milliseconds between steps
```

### Array Parameters
Adjust array generation settings:
```javascript
this.maxArraySize = 350;   // Maximum array size
this.minValue = 10;        // Minimum bar height
this.maxValue = 300;       // Maximum bar height
```

### Animation Speed
Modify the speed options array in the JavaScript file:
```javascript
this.speedOptions = [33, 50, 67, 100, 133, 150, 175, 200, 400, 500, 1000]; // Speed options in milliseconds
// 3x, 2.5x, 2x, 1x, 0.75x, 0.5x, 0.25x, 0.2x, 0.1x speeds
```

### Theme Colors
Modify CSS variables in the stylesheet:
```css
:root {
    --accent-primary: #3b82f6;
    --accent-secondary: #10b981;
    /* ... other colors */
}
```

## 🔮 Future Enhancements

### Planned Features
- **Additional Algorithms**: Heap Sort, Radix Sort, Shell Sort
- **Speed Controls**: Adjustable animation speed slider
- **Sound Effects**: Audio feedback during sorting
- **Export Results**: Save sorting statistics and visualizations
- **Algorithm Comparison**: Side-by-side algorithm performance analysis

### Technical Improvements
- **Web Workers**: Background processing for large datasets
- **Canvas Rendering**: Hardware-accelerated graphics
- **3D Visualizations**: Three-dimensional array representations
- **Machine Learning**: Algorithm performance prediction

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure you're using a modern browser
3. Try refreshing the page
4. Open an issue on the repository

## 🙏 Acknowledgments

- **Fonts**: Inter font family from Google Fonts
- **Icons**: Emoji icons for theme switching
- **Inspiration**: Educational sorting algorithm visualizations

---

**Happy Sorting! 🎉**
# Sorting-Visualizer
