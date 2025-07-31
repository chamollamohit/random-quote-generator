
// Here we are saving all require elements like bitton, Quote Block, Author Block in Varaile
let generateBtn = document.querySelector('#new-quote-btn')
let quoteBlock = document.querySelector('.quote-text')
let authorBlock = document.querySelector('.quote-author')

// This is a Quote Generator Function {Always rember async function retun a promise so always use await to get the value from async fucntion}
// .Json is used here to convert the data we recieved from API to a object this also takes time so use await also
async function quoteGenerator() {
    var quote = await fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random')
    var quote = await quote.json()
    return quote
}

// Here we added Event Listner on Get Quote Button once the button is clicked Quote Generator function is invoked and we update the Quote Block and Author Block with the updated values
generateBtn.addEventListener('click', async () => {
    let quote = await quoteGenerator()
    let quoteText = await quote.data.content
    let quoteAuthor = await quote.data.author
    quoteBlock.innerHTML = quoteText
    authorBlock.innerHTML = quoteAuthor
    
})

