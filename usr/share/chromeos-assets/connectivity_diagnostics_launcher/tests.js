var result;
chrome.runtime.sendMessage(
    "kodldpbjkkmmnilagfdheibampofhaom",
    {command: "test"}, function(res) { result = res; });
