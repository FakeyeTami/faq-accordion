document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion-item");

    // Open the first accordion by default
    let firstAccordion = accordions[0];
    firstAccordion.classList.add("active");
    let firstContent = firstAccordion.querySelector(".accordion-content");
    firstContent.style.maxHeight = firstContent.scrollHeight + "px";

    accordions.forEach((accordion, index) => {
        let header = accordion.querySelector(".accordion-header");
        let content = accordion.querySelector(".accordion-content");
        let image = accordion.querySelector(".accordion-image");

        // Make header focusable and set ARIA attributes
        header.setAttribute("role", "button");
        header.setAttribute("tabindex", "0");
        header.setAttribute(
            "aria-expanded",
            accordion.classList.contains("active")
        );

        header.addEventListener("click", () =>
            toggleAccordion(accordion, content, image)
        );
        header.addEventListener("keydown", (event) =>
            handleKeyboardNavigation(event, index)
        );
    });

    function toggleAccordion(accordion, content, image) {
        let isActive = accordion.classList.contains("active");

        // Close all accordions if needed (optional)
        accordions.forEach((item) => {
            item.classList.remove("active");
            item.querySelector(".accordion-content").style.maxHeight = null;
            item.querySelector(".accordion-image").src =
                "assets/images/icon-plus.svg";
            item.querySelector(".accordion-header").setAttribute(
                "aria-expanded",
                "false"
            );
        });

        if (!isActive) {
            accordion.classList.add("active");
            content.style.maxHeight = content.scrollHeight + "px";
            image.src = "assets/images/icon-minus.svg";
            accordion
                .querySelector(".accordion-header")
                .setAttribute("aria-expanded", "true");
        }
    }

    function handleKeyboardNavigation(event, index) {
        const headers = document.querySelectorAll(".accordion-header");

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                let nextIndex = (index + 1) % headers.length;
                headers[nextIndex].focus();
                break;

            case "ArrowUp":
                event.preventDefault();
                let prevIndex = (index - 1 + headers.length) % headers.length;
                headers[prevIndex].focus();
                break;

            case "Home":
                event.preventDefault();
                headers[0].focus();
                break;

            case "End":
                event.preventDefault();
                headers[headers.length - 1].focus();
                break;

            case "Enter":
            case " ":
                event.preventDefault();
                let accordion = accordions[index];
                let content = accordion.querySelector(".accordion-content");
                let image = accordion.querySelector(".accordion-image");
                toggleAccordion(accordion, content, image);
                break;
        }
    }
});
