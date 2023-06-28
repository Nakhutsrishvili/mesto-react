import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function Like({ likes, myid, cardid }) {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);
  useEffect(() => {
    setIsLike(likes.some((element) => myid === element._id));
  }, [likes, myid]);

  function handleLike() {
    if (isLike) {
      api
        .deleteLike(cardid)
        .then((res) => {
          setIsLike(false);
          setCount(res.likes.length);
        })
        .catch((error) => console.error(`Ошибка при удалении лайка ${error}`));
    } else {
      api
        .addLike(cardid)
        .then((res) => {
          setIsLike(true);
          setCount(res.likes.length);
        })
        .catch((error) => console.error(`Ошибка постановки лайка ${error}`));
    }
  }

  return (
    <>
      <button
        aria-label="Лайкнуть"
        type="button"
        className={`element__group-like ${
          isLike ? "element__group-like_active" : ""
        }`}
        onClick={handleLike}
      />
      <span className="element__counter">{count}</span>
    </>
  );
}
