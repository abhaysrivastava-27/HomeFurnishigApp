createDynamicHtml = (filteredData) => {    // Function to create dynamic html when data is fetched from database
    const app = document.getElementById('categories')
    app.innerHTML = ''
    const container = document.createElement('div')
    container.setAttribute('class', 'container')
    app.appendChild(container)
    return (
        filteredData.map((d) => {
            const card = document.createElement('div')
            card.setAttribute('class', 'displayContent')

            const card1 = document.createElement('div')
            card1.setAttribute('class', 'imgCover')

            const logo = document.createElement('img')
            logo.setAttribute('src', d.image)
            logo.setAttribute('class', 'image')
            logo.setAttribute('alt',d.title)

            const p = document.createElement('p')
            p.textContent = d.title
            p.setAttribute('class', 'itemTitle')

            const span = document.createElement('span')
            span.setAttribute('class', 'details')

            const p1 = document.createElement('p')
            p1.textContent = d.category
            p1.setAttribute('class', 'itemCategory')

            const p2 = document.createElement('p')
            p2.textContent = d.price
            p2.setAttribute('class', 'itemPrice')

            const span1 = document.createElement('span')
            span1.setAttribute('class', 'details')

            const cart = document.createElement('i')
            cart.className = "fa fa-shopping-cart cart";


            const star = document.createElement('i')
            star.className = "fa fa-star star"

            const star1 = document.createElement('i')
            star1.className = "fa fa-star star"

            const star2 = document.createElement('i')
            star2.className = "fa fa-star star"

            const star3 = document.createElement('i')
            star3.className = "fa fa-star star"

            const star4 = document.createElement('i')
            star4.className = "fa fa-star star"

            container.appendChild(card)
            card.appendChild(card1)
            card1.appendChild(logo)
            card.appendChild(p)
            card.appendChild(span)
            span.appendChild(p1)
            span.appendChild(p2)
            card.appendChild(span1)
            span1.appendChild(star)
            span1.appendChild(star1)
            span1.appendChild(star2)
            span1.appendChild(star3)
            span1.appendChild(star4)
            span1.appendChild(cart)

        })
    )
}