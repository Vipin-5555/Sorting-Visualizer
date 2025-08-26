// Sorting Visualizer - Main JavaScript File
class SortingVisualizer {
    constructor() {
        this.array = [];
        this.originalArray = [];
        this.isSorting = false;
        this.isPaused = false;
        this.currentStep = 0;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.animationSpeed = 100; // milliseconds between steps
        this.speedOptions = [33, 50, 67, 100, 67, 133, 150, 175, 200, 400]; // Speed options in milliseconds
        this.currentSpeedIndex = 4; // Default to 100ms (index 4)
        this.maxArraySize = 350;
        this.minValue = 10;
        this.maxValue = 300;
        
        this.initializeElements();
        this.bindEvents();
        this.generateRandomArray();
        this.updatePseudoCode();
    }

    // Initialize DOM elements
    initializeElements() {
        this.arrayContainer = document.getElementById('arrayContainer');
        this.arrayInput = document.getElementById('arrayInput');
        this.algorithmSelect = document.getElementById('algorithmSelect');
        this.speedSelect = document.getElementById('speedSelect');
        this.generateBtn = document.getElementById('generateBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.pseudoCode = document.getElementById('pseudoCode');
        this.copyPseudoCodeBtn = document.getElementById('copyPseudoCode');
        this.arraySizeEl = document.getElementById('arraySize');
        this.comparisonsEl = document.getElementById('comparisons');
        this.swapsEl = document.getElementById('swaps');
        this.timeElapsedEl = document.getElementById('timeElapsed');
    }

    // Bind event listeners
    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateRandomArray());
        this.shuffleBtn.addEventListener('click', () => this.shuffleArray());
        this.startBtn.addEventListener('click', () => this.startSorting());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.resetBtn.addEventListener('click', () => this.resetArray());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.arrayInput.addEventListener('input', (e) => this.handleCustomArray(e));
        this.copyPseudoCodeBtn.addEventListener('click', () => this.copyPseudoCode());
        this.algorithmSelect.addEventListener('change', () => this.updatePseudoCode());
        this.speedSelect.addEventListener('change', (e) => this.changeSpeed(e));
        
        // Handle window resize for responsive bar sizing
        window.addEventListener('resize', () => {
            if (this.array.length > 0) {
                this.renderArray();
            }
        });
    }

    // Theme management
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update theme icon
        const themeIcon = this.themeToggle.querySelector('.theme-icon');
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }

    // Initialize theme from localStorage
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const themeIcon = this.themeToggle.querySelector('.theme-icon');
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    // Generate random array
    generateRandomArray() {
        const size = Math.floor(Math.random() * (this.maxArraySize - 10) + 10);
        this.array = [];
        
        for (let i = 0; i < size; i++) {
            this.array.push(Math.floor(Math.random() * (this.maxValue - this.minValue) + this.minValue));
        }
        
        this.originalArray = [...this.array];
        this.resetStats();
        this.renderArray();
        this.updateStats();
    }

    // Handle custom array input
    handleCustomArray(e) {
        const input = e.target.value.trim();
        if (input === '') return;
        
        try {
            const numbers = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
            if (numbers.length > 0 && numbers.length <= this.maxArraySize) {
                this.array = numbers;
                this.originalArray = [...this.array];
                this.resetStats();
                this.renderArray();
                this.updateStats();
            }
        } catch (error) {
            console.error('Invalid array input:', error);
        }
    }

    // Shuffle array
    shuffleArray() {
        if (this.isSorting) return;
        
        for (let i = this.array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }
        
        this.resetStats();
        this.renderArray();
        this.updateStats();
    }

    // Reset array to original state
    resetArray() {
        if (this.isSorting) return;
        
        this.array = [...this.originalArray];
        this.resetStats();
        this.renderArray();
        this.updateStats();
        this.clearBarStates();
    }

    // Reset statistics
    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.currentStep = 0;
    }

    // Render array as bars
    renderArray() {
        this.arrayContainer.innerHTML = '';
        
        // Calculate dynamic bar dimensions based on array size and values
        const containerWidth = this.arrayContainer.clientWidth || 800;
        const maxBarHeight = Math.min(300, this.arrayContainer.clientHeight - 100);
        const maxValue = Math.max(...this.array);
        const minBarWidth = Math.max(16, containerWidth / this.array.length - 4);
        
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            
            // Scale height to fit within container
            const scaledHeight = (value / maxValue) * maxBarHeight;
            bar.style.height = `${scaledHeight}px`;
            bar.style.width = `${minBarWidth}px`;
            
            bar.textContent = value;
            bar.dataset.index = index;
            bar.dataset.value = value;
            
            this.arrayContainer.appendChild(bar);
        });
    }

    // Update statistics display
    updateStats() {
        this.arraySizeEl.textContent = this.array.length;
        this.comparisonsEl.textContent = this.comparisons;
        this.swapsEl.textContent = this.swaps;
        
        if (this.startTime > 0) {
            const elapsed = (Date.now() - this.startTime) / 1000;
            this.timeElapsedEl.textContent = elapsed.toFixed(2) + 's';
        } else {
            this.timeElapsedEl.textContent = '0.00s';
        }
    }

    // Clear all bar states
    clearBarStates() {
        const bars = this.arrayContainer.querySelectorAll('.array-bar');
        bars.forEach(bar => {
            bar.classList.remove('comparing', 'swapping', 'sorted');
        });
    }

    // Start sorting process
    async startSorting() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        this.isPaused = false;
        this.startTime = Date.now();
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.generateBtn.disabled = true;
        this.shuffleBtn.disabled = true;
        this.resetBtn.disabled = true;
        
        const algorithm = this.algorithmSelect.value;
        
        try {
            switch (algorithm) {
                case 'bubble':
                    await this.bubbleSort();
                    break;
                case 'selection':
                    await this.selectionSort();
                    break;
                case 'insertion':
                    await this.insertionSort();
                    break;
                case 'merge':
                    await this.mergeSort();
                    break;
                case 'quick':
                    await this.quickSort();
                    break;
            }
        } catch (error) {
            console.error('Sorting error:', error);
        }
        
        this.finishSorting();
    }

    // Toggle pause state
    togglePause() {
        this.isPaused = !this.isPaused;
        this.pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
    }

    // Wait for animation step
    async wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    // Finish sorting process
    finishSorting() {
        this.isSorting = false;
        this.isPaused = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.generateBtn.disabled = false;
        this.shuffleBtn.disabled = false;
        this.resetBtn.disabled = false;
        this.pauseBtn.textContent = 'Pause';
        
        // Mark all bars as sorted
        const bars = this.arrayContainer.querySelectorAll('.array-bar');
        bars.forEach(bar => {
            bar.classList.add('sorted');
        });
        
        this.updateStats();
    }

    // Bubble Sort Algorithm
    async bubbleSort() {
        const n = this.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.isPaused) {
                    while (this.isPaused) await this.wait(100);
                }
                
                this.comparisons++;
                this.updateStats();
                
                // Highlight comparing bars
                this.highlightBars(j, j + 1, 'comparing');
                
                if (this.array[j] > this.array[j + 1]) {
                    // Swap elements
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    this.swaps++;
                    this.updateStats();
                    
                    // Highlight swapping bars
                    this.highlightBars(j, j + 1, 'swapping');
                    this.renderArray();
                    this.highlightBars(j, j + 1, 'swapping');
                }
                
                await this.wait(this.animationSpeed);
                this.clearBarStates();
            }
            
            // Mark last element as sorted
            const lastBar = this.arrayContainer.children[n - i - 1];
            if (lastBar) lastBar.classList.add('sorted');
        }
        
        // Mark first element as sorted
        const firstBar = this.arrayContainer.children[0];
        if (firstBar) firstBar.classList.add('sorted');
    }

    // Change animation speed
    changeSpeed(e) {
        const speedIndex = parseInt(e.target.value);
        this.currentSpeedIndex = speedIndex;
        this.animationSpeed = this.speedOptions[speedIndex];
    }

    // Selection Sort Algorithm
    async selectionSort() {
        const n = this.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            
            for (let j = i + 1; j < n; j++) {
                if (this.isPaused) {
                    while (this.isPaused) await this.wait(100);
                }
                
                this.comparisons++;
                this.updateStats();
                
                // Highlight comparing bars
                this.highlightBars(minIndex, j, 'comparing');
                
                if (this.array[j] < this.array[minIndex]) {
                    minIndex = j;
                }
                
                await this.wait(this.animationSpeed);
                this.clearBarStates();
            }
            
            if (minIndex !== i) {
                // Swap elements
                [this.array[i], this.array[minIndex]] = [this.array[minIndex], this.array[i]];
                this.swaps++;
                this.updateStats();
                
                // Highlight swapping bars
                this.highlightBars(i, minIndex, 'swapping');
                this.renderArray();
                this.highlightBars(i, minIndex, 'swapping');
                await this.wait(this.animationSpeed);
            }
            
            // Mark current position as sorted
            const sortedBar = this.arrayContainer.children[i];
            if (sortedBar) sortedBar.classList.add('sorted');
        }
        
        // Mark last element as sorted
        const lastBar = this.arrayContainer.children[n - 1];
        if (lastBar) lastBar.classList.add('sorted');
    }

    // Insertion Sort Algorithm
    async insertionSort() {
        const n = this.array.length;
        
        for (let i = 1; i < n; i++) {
            const key = this.array[i];
            let j = i - 1;
            
            while (j >= 0 && this.array[j] > key) {
                if (this.isPaused) {
                    while (this.isPaused) await this.wait(100);
                }
                
                this.comparisons++;
                this.updateStats();
                
                // Highlight comparing bars
                this.highlightBars(j, j + 1, 'comparing');
                
                this.array[j + 1] = this.array[j];
                this.swaps++;
                this.updateStats();
                
                // Highlight shifting bars
                this.highlightBars(j, j + 1, 'swapping');
                this.renderArray();
                this.highlightBars(j, j + 1, 'swapping');
                
                j--;
                await this.wait(this.animationSpeed);
                this.clearBarStates();
            }
            
            this.array[j + 1] = key;
            this.renderArray();
            
            // Mark sorted portion
            for (let k = 0; k <= i; k++) {
                const bar = this.arrayContainer.children[k];
                if (bar) bar.classList.add('sorted');
            }
        }
    }

    // Merge Sort Algorithm
    async mergeSort() {
        await this.mergeSortHelper(0, this.array.length - 1);
    }

    async mergeSortHelper(left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            await this.mergeSortHelper(left, mid);
            await this.mergeSortHelper(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    async merge(left, mid, right) {
        const leftArray = this.array.slice(left, mid + 1);
        const rightArray = this.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArray.length && j < rightArray.length) {
            if (this.isPaused) {
                while (this.isPaused) await this.wait(100);
            }
            
            this.comparisons++;
            this.updateStats();
            
            // Highlight comparing bars
            this.highlightBars(left + i, mid + 1 + j, 'comparing');
            
            if (leftArray[i] <= rightArray[j]) {
                this.array[k] = leftArray[i];
                i++;
            } else {
                this.array[k] = rightArray[j];
                j++;
            }
            
            this.swaps++;
            this.updateStats();
            
            // Highlight merging bars
            this.highlightBars(k, k, 'swapping');
            this.renderArray();
            this.highlightBars(k, k, 'swapping');
            
            k++;
            await this.wait(this.animationSpeed);
            this.clearBarStates();
        }
        
        while (i < leftArray.length) {
            this.array[k] = leftArray[i];
            this.highlightBars(k, k, 'swapping');
            this.renderArray();
            this.highlightBars(k, k, 'swapping');
            i++;
            k++;
            await this.wait(this.animationSpeed);
            this.clearBarStates();
        }
        
        while (j < rightArray.length) {
            this.array[k] = rightArray[j];
            this.highlightBars(k, k, 'swapping');
            this.renderArray();
            this.highlightBars(k, k, 'swapping');
            j++;
            k++;
            await this.wait(this.animationSpeed);
            this.clearBarStates();
        }
        
        // Mark merged portion as sorted
        for (let m = left; m <= right; m++) {
            const bar = this.arrayContainer.children[m];
            if (bar) bar.classList.add('sorted');
        }
    }

    // Quick Sort Algorithm
    async quickSort() {
        await this.quickSortHelper(0, this.array.length - 1);
    }

    async quickSortHelper(low, high) {
        if (low < high) {
            const pi = await this.partition(low, high);
            await this.quickSortHelper(low, pi - 1);
            await this.quickSortHelper(pi + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            if (this.isPaused) {
                while (this.isPaused) await this.wait(100);
            }
            
            this.comparisons++;
            this.updateStats();
            
            // Highlight comparing bars
            this.highlightBars(j, high, 'comparing');
            
            if (this.array[j] < pivot) {
                i++;
                
                if (i !== j) {
                    // Swap elements
                    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                    this.swaps++;
                    this.updateStats();
                    
                    // Highlight swapping bars
                    this.highlightBars(i, j, 'swapping');
                    this.renderArray();
                    this.highlightBars(i, j, 'swapping');
                }
            }
            
            await this.wait(this.animationSpeed);
            this.clearBarStates();
        }
        
        // Place pivot in correct position
        if (i + 1 !== high) {
            [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
            this.swaps++;
            this.updateStats();
            
            // Highlight final pivot placement
            this.highlightBars(i + 1, high, 'swapping');
            this.renderArray();
            this.highlightBars(i + 1, high, 'swapping');
            await this.wait(this.animationSpeed);
        }
        
        // Mark pivot as sorted
        const pivotBar = this.arrayContainer.children[i + 1];
        if (pivotBar) pivotBar.classList.add('sorted');
        
        return i + 1;
    }

    // Highlight bars for comparison or swapping
    highlightBars(index1, index2, state) {
        const bars = this.arrayContainer.querySelectorAll('.array-bar');
        if (bars[index1]) bars[index1].classList.add(state);
        if (bars[index2]) bars[index2].classList.add(state);
    }

    // Update pseudo-code display
    updatePseudoCode() {
        const algorithm = this.algorithmSelect.value;
        const pseudoCodeMap = {
            bubble: [
                'for i = 0 to n-1',
                '  for j = 0 to n-i-1',
                '    if array[j] > array[j+1]',
                '      swap(array[j], array[j+1])',
                '    end if',
                '  end for',
                'end for'
            ],
            selection: [
                'for i = 0 to n-1',
                '  minIndex = i',
                '  for j = i+1 to n',
                '    if array[j] < array[minIndex]',
                '      minIndex = j',
                '    end if',
                '  end for',
                '  if minIndex != i',
                '    swap(array[i], array[minIndex])',
                '  end if',
                'end for'
            ],
            insertion: [
                'for i = 1 to n-1',
                '  key = array[i]',
                '  j = i-1',
                '  while j >= 0 and array[j] > key',
                '    array[j+1] = array[j]',
                '    j = j-1',
                '  end while',
                '  array[j+1] = key',
                'end for'
            ],
            merge: [
                'function mergeSort(array, left, right)',
                '  if left < right',
                '    mid = (left + right) / 2',
                '    mergeSort(array, left, mid)',
                '    mergeSort(array, mid+1, right)',
                '    merge(array, left, mid, right)',
                '  end if',
                'end function',
                '',
                'function merge(array, left, mid, right)',
                '  // Merge two sorted subarrays',
                '  // into a single sorted array'
            ],
            quick: [
                'function quickSort(array, low, high)',
                '  if low < high',
                '    pi = partition(array, low, high)',
                '    quickSort(array, low, pi-1)',
                '    quickSort(array, pi+1, high)',
                '  end if',
                'end function',
                '',
                'function partition(array, low, high)',
                '  pivot = array[high]',
                '  i = low - 1',
                '  for j = low to high-1',
                '    if array[j] < pivot',
                '      i = i + 1',
                '      swap(array[i], array[j])',
                '    end if',
                '  end for',
                '  swap(array[i+1], array[high])',
                '  return i + 1'
            ]
        };
        
        const code = pseudoCodeMap[algorithm];
        this.pseudoCode.innerHTML = '';
        
        code.forEach((line, index) => {
            const step = document.createElement('div');
            step.className = 'step';
            step.textContent = line;
            step.dataset.step = index;
            this.pseudoCode.appendChild(step);
        });
    }

    // Highlight current step in pseudo-code
    highlightStep(stepIndex) {
        const steps = this.pseudoCode.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index < stepIndex) {
                step.classList.add('completed');
            } else if (index === stepIndex) {
                step.classList.add('active');
            }
        });
    }

    // Copy pseudo-code to clipboard
    async copyPseudoCode() {
        const algorithm = this.algorithmSelect.value;
        const pseudoCodeMap = {
            bubble: [
                'Bubble Sort Algorithm:',
                'for i = 0 to n-1',
                '  for j = 0 to n-i-1',
                '    if array[j] > array[j+1]',
                '      swap(array[j], array[j+1])',
                '    end if',
                '  end for',
                'end for',
                '',
                'Time Complexity: O(n²)',
                'Space Complexity: O(1)'
            ],
            selection: [
                'Selection Sort Algorithm:',
                'for i = 0 to n-1',
                '  minIndex = i',
                '  for j = i+1 to n',
                '    if array[j] < array[minIndex]',
                '      minIndex = j',
                '    end if',
                '  end for',
                '  if minIndex != i',
                '    swap(array[i], array[minIndex])',
                '    end if',
                'end for',
                '',
                'Time Complexity: O(n²)',
                'Space Complexity: O(1)'
            ],
            insertion: [
                'Insertion Sort Algorithm:',
                'for i = 1 to n-1',
                '  key = array[i]',
                '  j = i-1',
                '  while j >= 0 and array[j] > key',
                '    array[j+1] = array[j]',
                '    j = j-1',
                '  end while',
                '  array[j+1] = key',
                'end for',
                '',
                'Time Complexity: O(n²)',
                'Space Complexity: O(1)'
            ],
            merge: [
                'Merge Sort Algorithm:',
                'function mergeSort(array, left, right)',
                '  if left < right',
                '    mid = (left + right) / 2',
                '    mergeSort(array, left, mid)',
                '    mergeSort(array, mid+1, right)',
                '    merge(array, left, mid, right)',
                '  end if',
                'end function',
                '',
                'function merge(array, left, mid, right)',
                '  // Merge two sorted subarrays',
                '  // into a single sorted array',
                '',
                'Time Complexity: O(n log n)',
                'Space Complexity: O(n)'
            ],
            quick: [
                'Quick Sort Algorithm:',
                'function quickSort(array, low, high)',
                '  if low < high',
                '    pi = partition(array, low, high)',
                '    quickSort(array, low, pi-1)',
                '    quickSort(array, pi+1, high)',
                '  end if',
                'end function',
                '',
                'function partition(array, low, high)',
                '  pivot = array[high]',
                '  i = low - 1',
                '  for j = low to high-1',
                '    if array[j] < pivot',
                '      i = i + 1',
                '      swap(array[i], array[j])',
                '    end if',
                '  end for',
                '  swap(array[i+1], array[high])',
                '  return i + 1',
                '',
                'Time Complexity: O(n log n) average, O(n²) worst case',
                'Space Complexity: O(log n)'
            ]
        };
        
        const code = pseudoCodeMap[algorithm];
        const codeText = code.join('\n');
        
        try {
            await navigator.clipboard.writeText(codeText);
            this.showCopySuccess();
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = codeText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showCopySuccess();
        }
    }

    // Show copy success message
    showCopySuccess() {
        const originalText = this.copyPseudoCodeBtn.innerHTML;
        this.copyPseudoCodeBtn.innerHTML = '<span class="copy-icon">✅</span> Copied!';
        this.copyPseudoCodeBtn.classList.add('copy-success');
        
        setTimeout(() => {
            this.copyPseudoCodeBtn.innerHTML = originalText;
            this.copyPseudoCodeBtn.classList.remove('copy-success');
        }, 2000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const visualizer = new SortingVisualizer();
    visualizer.initTheme();
    
    // Make visualizer globally accessible for debugging
    window.sortingVisualizer = visualizer;
});
