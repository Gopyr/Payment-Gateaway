import element from "../../assets/image/graphic-elements.png";
import logo from "../../assets/image/logo.png";
import ModalContent from "../Modal";
import { getAllProducts } from "../../utils/products/services";
import { useEffect, useState } from "react";
import "./MainStyle.css";
const Main = () => {
  const [image, setImage] = useState([]);
  const [cards, setCard] = useState([]);
  const [cardId, setCardId] = useState(null);
  const [isHovered, setIsHover] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (id) => {
    console.log("Opening modal for product ID:", id);
    setCardId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCardId(null);
  };

  useEffect(() => {
    setImage([
      { src: element, alt: "Image 1" },
      { src: element, alt: "Image 2" },
      { src: element, alt: "Image 3" },
      { src: element, alt: "Image 4" },
      { src: element, alt: "Image 5" },
    ]);

    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setCard(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []); // ✅ hanya sekali

  return (
    <div className="h-screen w-screen w-full">
      <div className="flex justify-center p-6 ">
        <div className="side-left absolute mt-30 left-0 h-full">
          <div className="grid grid-rows-5 relative">
            {image.map((img, index) => {
              let extraClass = "";
              let style = { transfrom: `translateY(${index * 20}px)` };
              if (index === 0) {
                extraClass = "";
                style.animation = "var(--slide-right)";
              } else if (index === 1) {
                extraClass = "left-[150px] ";
                style.animation = "var(--slide-left)";
              } else if (index === 2) {
                extraClass = "";
                style.animation = "var(--slide-right)";
              } else if (index === 3) {
                extraClass = "left-[150px]";
                style.animation = "var(--slide-left)";
              } else if (index === 4) {
                extraClass = "";
                style.animation = "var(--slide-right)";
              }

              return (
                <div
                  key={index}
                  className="relative w-[190px] h-[190px] overflow-visible"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ${extraClass}`}
                    style={style}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="main flex flex-col h-full w-[40vw]">
          <nav className="mb-10 text-center">
            <span className="[font-family:var(--font-caveat)] text-6xl">
              Shope
            </span>
          </nav>
          <main className="flex flex-col">
            <div className="card grid grid-cols-2 gap-7">
              {cards.map((card, index) => {
                const isHover = isHovered === index;
                return (
                  <div className="flex w-auto h-auto" key={index}>
                    <div
                      className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 w-auto h-auto group"
                      onMouseEnter={() => setIsHover(index)}
                      onMouseLeave={() => setIsHover(null)}
                    >
                      <div className="card-body relative z-30 h-[400px] w-[450px]  cursor-pointer">
                        <div className="flex flex-col hover:opacity-80 transition-opacity duration-300 ease-in-out">
                          <img
                            src="/Sepatu Jogging.avif"
                            alt={card.alt}
                            className={`w-[400px] h-[400px] object-cover ${
                              isHover ? "slide-down-img" : "slide-up-img"
                            }`} // 650px
                          />
                          <div
                            className={` gap-2 p-4 absolute top-72 left-2 bg-opacity-80 ${
                              isHover ? "position-up" : "position-down"
                            }  transition-all duration-300 ease-in-out`}
                          >
                            <div className="flex flex-col justify-between items-center h-full w-full">
                              <div className="flex items-center gap-2">
                                <img
                                  src={logo}
                                  alt="Logo"
                                  className="rounded-full w-[60px] h-[60px]"
                                />
                                <div className="title-logo flex flex-col">
                                  <span className="title text-[15px] text-[#004D4C] [font-family:var(--font-hyper-viper)]">
                                    SHOPE ESD
                                  </span>
                                  <span className="sub-title text-[12px] text-[#004D4C]">
                                    shell Brand Product
                                  </span>
                                </div>
                                <div className="price text-[20px] text-[#004D4C] pl-20">
                                  Rp {card.price}
                                </div>
                              </div>
                              <div>
                                <button
                                  onClick={() => {
                                    handleOpenModal(card.product_id);
                                  }}
                                  className="bg-[#004D4C] text-white p-2 text-[20px] rounded-lg absolute top-130 left-2 hover:bg-[#003d3c] transition-colors duration-300 ease-in-out"
                                  type="button"
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`card-footer flex flex-col p-4 gap-2 transition-all duration-300 ease-in-out relative ${
                          isHover ? "slide-up" : ""
                        }`}
                      >
                        <div className="text-[#004D4C] text-[20px]">
                          {card.title}
                        </div>
                        <div className="card-item text-justify">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Modi vel nobis ad provident unde nihil soluta
                          corrupti distinctio doloremque animi? Debitis totam
                          saepe delectus consectetur reiciendis perferendis
                          soluta velit iure? Lorem ipsum dolor Lorem ipsum dolor
                          sit amet, consectetur adipisicing elit.
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
      {isModalOpen && (
        <ModalContent
          product_id={cardId}
          onClose={() => {
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default Main;
