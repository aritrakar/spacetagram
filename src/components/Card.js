import React, { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import HeartIcon from "../assets/icons/HeartIcon";
import { LinkIcon } from "../assets/icons";

const emptyHeart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 
      00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const filledHeart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 20 20"
    fill="red"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 
      5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

const shareButton = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 
      2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 
      105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  </svg>
);

export default function Card(props) {
  const [likeEffect, setLikeEffect] = useState(false);
  const [shareEffect, setShareEffect] = useState(false);
  const [linkEffect, setLinkEffect] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const titleRef = useRef(null);

  const handleLike = () => {
    setLikeEffect(true);
    setLiked((prevLiked) => !prevLiked);
  };

  // Copies image link to clipboard
  const handleShare = () => {
    var mymessage = `${props.title} - See on Spacetagram`;
    var message = mymessage.split(" ").join("%20");
    var link = "https://api.whatsapp.com/send?text=" + message;

    window.location.href = link;
    setShareEffect(true);
    navigator.clipboard.writeText(props.image);
    setTimeout(() => setShareEffect(false), 200);
  };

  const handleLink = () => {
    setLinkEffect(true);

    let copyText =
      window.location.protocol +
      "//" +
      window.location.host +
      "/posts/" +
      props.date;

    window.location.href = copyText;

    setTimeout(() => setLinkEffect(false), 100);
  };

  let body = props.body;
  const maxStringDisplayLength = 140;
  if (body && body.length > maxStringDisplayLength) {
    body = body.slice(0, maxStringDisplayLength);
  }

  return (
    <React.Fragment>
      <div
        className="min-w-16 max-w-sm min-h-full rounded-t-3xl 
        rounded-b-xl overflow-hidden shadow-lg m-4 hover:scale-105
        transition duration-300"
      >
        <img
          className="w-full h-80 object-cover"
          src={props.image}
          alt={props.title}
        />
        <div className="flex px-6 pt-4 pb-1">
          {/* Like button */}
          <button
            className={`${
              likeEffect && "animate-beat"
            } inline-block bg-gray-200 rounded-full px-3 py-1 
          text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-pink-200`}
            onClick={handleLike}
            onAnimationEnd={() => setLikeEffect(false)}
          >
            {<HeartIcon condition={liked} />}
          </button>

          {/* Share button */}
          <button
            className={`${
              shareEffect && "animate-beat"
            } inline-block bg-gray-200 rounded-full px-3 py-1 text-sm 
          font-semibold text-gray-700 mr-2 mb-2 hover:bg-blue-200`}
            onClick={handleShare}
          >
            {shareButton}
          </button>

          <button
            className={` ${
              linkEffect && "animate-beat"
            } inline-block ml-auto bg-gray-200 rounded-full px-3 py-1 text-sm 
          font-semibold text-gray-700 mr-2 mb-2 hover:bg-green-200`}
            onClick={handleLink}
            onAnimationEnd={() => setLinkEffect(false)}
          >
            <LinkIcon />
          </button>
        </div>

        <div className="px-6 py-2 pb-4">
          <div className="font-bold text-xl mb-2 font-sans">
            {props.title} - {props.date}
          </div>
          <p className="text-gray-700 text-base font-lightfont">
            {body}{" "}
            <button
              className="text-gray-400 hover:text-gray-800"
              onClick={() => {
                setShowModal(true);
                titleRef.current.focus();
              }}
            >
              more...
            </button>
          </p>
        </div>
      </div>

      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"> */}
              <div
                className="inline-block align-bottom bg-white rounded-lg 
                text-center overflow-hidden shadow-xl transform transition-all
                sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left font-sans">
                      <Dialog.Title
                        ref={titleRef}
                        as="h3"
                        className="text-lg leading-5 font-medium text-gray-900"
                      >
                        {props.title} - {props.date}
                      </Dialog.Title>
                      <div className="mt-2">
                        <img
                          className="w-full mb-2"
                          src={props.image}
                          alt={props.title}
                        />
                        <p className="text-sm text-gray-500 font-lightfont">
                          {props.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleLike}
                  >
                    {liked ? filledHeart : emptyHeart}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleShare}
                  >
                    {shareButton}
                  </button>
                  <div className="sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </React.Fragment>
  );
}
