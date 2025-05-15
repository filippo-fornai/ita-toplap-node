export default function useCipherEffect(selector) {
      
    const links = [];

    if (selector instanceof String){
        links = document.querySelectorAll(selector);
        links.forEach(cipherEffect);

    } else if (selector instanceof HTMLElement) {
        cipherEffect(selector);
    }

    // console.log(links);
  
}

function cipherEffect(link) {
    // Save the original text inside a dataset
    // console.log(link.innerText);
    const { cipherAnimationTime } = useRuntimeConfig().public;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  
    link.dataset.value = link.innerText;
    // console.log(link.dataset.value);

    let intervalTime = cipherAnimationTime / link.dataset.value.length;
    // Set the interval time based on the length of the text

    // console.log(link)
    // console.log(intervalTime);
    // console.log(link.dataset.value.length);
    // console.log();
    let iteration = 0;

    const interval = setInterval(() => {
        let supp = link.innerText.split("")
        // console.log("supp:",supp);

        link.innerText = supp.map((letter, index) => {
                if (index < iteration) return link.dataset.value[index];
                switch (letter) {
                    case " ":
                        return " "; // Preserve spaces
                    // case ".":
                    //     return "."; // Preserve dots
                    case ",":
                        return ","; // Preserve commas
                    case "\n":
                        return "\n"; // Preserve numbers
                }

                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iteration >= link.dataset.value.length) clearInterval(interval);

        iteration += 1 / 2;
    }, intervalTime);
}