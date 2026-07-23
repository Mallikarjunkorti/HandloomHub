const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let current = 0;
        const increment = Math.ceil(target / 80);

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                current = target;

            }

            counter.innerText = current + (target >= 100 ? "+" : "");

            if (current < target) {

                requestAnimationFrame(updateCounter);

            }

        };

        updateCounter();

        observer.unobserve(counter);

    });

});

counters.forEach(counter => observer.observe(counter));