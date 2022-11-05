const reading_time = (blog) => {
    const noOfWords = blog?.split(' ')?.length ?? 0
    // assuming the average person reads 200 words a minute
    const wordsPerMinute = noOfWords / 200
    return Math.round(wordsPerMinute) === 0 ? 1 : Math.round(wordsPerMinute)
}

module.exports = { reading_time }