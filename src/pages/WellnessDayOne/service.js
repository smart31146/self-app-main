export const getStoryTests = async () => {

    const tests = [
        {name: "Easy", isDone: false, testLink: "/wellness/story-test/easy", storageKey: "story_easy"},
        {name: "Medium", isDone: false, testLink: "/wellness/story-test/medium", key: "story_medium"},
        {name: "Hard", isDone: false, testLink: "/wellness/story-test/hard", storageKey: "story_hard"}
    ]

    const testsWithStatuses = tests.map((test) => {
        const sessionObject = sessionStorage.getItem(test.storageKey);
        return {...test, isDone: !!sessionObject}
    })

    return testsWithStatuses;
}