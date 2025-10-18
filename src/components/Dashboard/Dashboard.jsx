import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Dashboard.css";

const sampleNews = [
  {
    id: "1",
    title: "Champions of MU CSE Fest 2024",
    excerpt:
      "Champions of MU CSE Fest 2024 - Inter University Programming Contest - Sylhet Division. Members : Abdullah Al Mahmud, Jawad Aziz Chowdhury, Rafid Bin Nasim Soccho.",
    image: "/public/images/news1.png",
    url: "/news/1",
  },
  {
    id: "2",
    title: "Versity is full of fun.",
    excerpt: "সেই চিল আর চিল",
    image: "/public/images/news2.png",
    url: "/news/2",
  },
  {
    id: "3",
    title: "ICPC World Finals Participation",
    excerpt: "Wishing our brilliant minds from Team SUST_Fanatics the very best as they represent SUST on the global stage at the 49th ICPC World Finals!",
    image: "/public/images/news3.png",
    url: "/news/3",
  },
];

export default function Dashboard({ items = sampleNews, interval = 5000, onReadMore }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  function startTimer() {
    stopTimer();
    if (paused) return;
    if (progressRef.current) {
      // reset
      progressRef.current.style.transition = `none`;
      progressRef.current.style.width = `0%`;
  // force reflow to pick up reset width
  void progressRef.current.offsetWidth;
      progressRef.current.style.transition = `width ${interval}ms linear`;
      progressRef.current.style.width = `100%`;
    }
    timerRef.current = setTimeout(() => {
      const next = (index + 1) % items.length;
      setIndex(next);
    }, interval);
  }

  function stopTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressRef.current) {
      progressRef.current.style.transition = `none`;
    }
  }

  function goTo(i) {
    setIndex(i);
  }

  function handleReadNext(e, it) {
    if (onReadMore) {
      e.preventDefault();
      onReadMore(it);
      return;
    }
    // default: navigate to provided url if present
    // allow normal anchor navigation by not preventing default
  }

  function handleMouseEnter() {
    setPaused(true);
    stopTimer();
  }
  function handleMouseLeave() {
    setPaused(false);
    startTimer();
  }

  function handleKey(e) {
    if (e.key === "ArrowRight") {
      setIndex((s) => (s + 1) % items.length);
    } else if (e.key === "ArrowLeft") {
      setIndex((s) => (s - 1 + items.length) % items.length);
    }
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchMove(e) {
    touchEndX.current = e.touches[0].clientX;
  }
  function onTouchEnd() {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        setIndex((s) => (s + 1) % items.length);
      } else {
        setIndex((s) => (s - 1 + items.length) % items.length);
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <section
      className="dashboard"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="slides">
        {items.map((it, i) => (
          <article
            key={it.id || i}
            className={`slide ${i === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${it.image || ""})` }}
            aria-hidden={i === index ? "false" : "true"}
          >
            <div className="overlay" />
            <div className="content">
              <h2>{it.title}</h2>
              <p>{it.excerpt}</p>
              <a href={it.url || `#/news/${it.id || i}`} onClick={(e) => handleReadNext(e, it)} className="read-more-btn">
                Read next
              </a>
            </div>
          </article>
        ))}
        <div className="indicators">
          {items.map((_, i) => (
            <span key={i} className={`dot ${i === index ? "active" : ""}`} onClick={() => goTo(i)} />
          ))}
        </div>

        <div className="progress-bar">
          <div className="progress" ref={progressRef} />
        </div>
      </div>
    </section>
  );
}

Dashboard.propTypes = {
  items: PropTypes.array,
  interval: PropTypes.number,
  onReadMore: PropTypes.func,
};
