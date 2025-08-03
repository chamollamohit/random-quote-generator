
// Here we are saving all require elements like bitton, Quote Block, Author Block in Varaile
document.addEventListener('DOMContentLoaded',() => {
    let generateBtn = document.querySelector('#new-quote-btn')
    let quoteBlock = document.querySelector('.quote-text')
    let authorBlock = document.querySelector('.quote-author')
    let copyBtn = document.querySelector('#copy-btn')
    let quoteWrapper = document.getElementById('quote-wrapper')
    let skeletonLoader = document.getElementById('skeleton-loader')

// Adding Eventlistner to Generate Button
    generateBtn.addEventListener('click',async () => {
        quoteWrapper.classList.add('hidden') // Unhidding Skelton Screen
        skeletonLoader.classList.remove('hidden') // Hidding Quote Screen
        generateBtn.disabled = true
        copyBtn.disabled = true

        try {
            const quoteData = await getQuote() // Getting Quote
            let {data} = quoteData
            quoteBlock.textContent = data.content
            authorBlock.textContent = data.author
            quoteWrapper.classList.remove('hidden') // Hidding Skelton Screen
            skeletonLoader.classList.add('hidden') // Unhidding Quote Screen
            copyBtn.classList.remove('hidden')
        } catch (error) {
            quoteBlock.textContent = error
            authorBlock.textContent = "Error"
        }
        finally {
            generateBtn.disabled = false
            copyBtn.disabled = false
            copyBtn.textContent = 'Copy'
        }

    })
    copyBtn.addEventListener('click', () => {
        saveToClipboard(quoteBlock.textContent)
        copyBtn.textContent = 'Copied'
    })
    

// Function which get Quote from API and return the quote when called
    async function getQuote() {
        const response = await fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random')
        const quote = await response.json()
        if (quote.success === false) {
            throw new Error("Unable to Fetch the Quote.... Try Again after some time !!!")
        }
        return quote
        
    }

// Function to save Quote in CLipboard
    async function saveToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text) // navigator.clipboard.writeText(text) use to save content in clipboard
        } catch (error) {
            return error
        }
    }
})
