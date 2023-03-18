import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LinkIcon, HeartIcon, CopyIcon } from "../assets/icons";
import { emptyHeart, filledHeart, shareButton } from "../assets/svgs.js";
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailIcon,
  TwitterIcon,
} from "react-share";
import { Link } from "react-router-dom";

export default function Card(props) {
  const [likeEffect, setLikeEffect] = useState(false);
  const [shareEffect, setShareEffect] = useState(false);
  const [linkEffect, setLinkEffect] = useState(false);
  const [copyEffect, setCopyEffect] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleLike = () => {
    setLikeEffect(true);
    setLiked((prevLiked) => !prevLiked);
  };

  const handleShare = () => {
    setShowSocial(true);
    setTimeout(() => setShareEffect(false), 200);
  };

  const handleLink = () => {
    setLinkEffect(true);
    setTimeout(() => setLinkEffect(false), 100);
  };

  const handleCopy = () => {
    setCopyEffect(true);
    navigator.clipboard.writeText(
      window.location.protocol +
        "//" +
        window.location.host +
        "/posts/" +
        props.date
    );
    setTimeout(() => setCopyEffect(false), 100);
  };

  let body = props.body;
  const maxStringDisplayLength = 140;
  if (body && body.length > maxStringDisplayLength) {
    body = body.slice(0, maxStringDisplayLength);
  }

  return (
    <React.Fragment>
      <div
        className=" bg-white dark:bg-slate-900 min-w-16 max-w-sm min-h-full rounded-t-3xl 
        rounded-b-xl pb-4 overflow-hidden shadow-lg m-4 hover:scale-105 hover:cursor-pointer
        transition duration-300"
      >
        {props.media_type === "image" ? (
          <img
            className={`w-full h-80 object-cover ${
              !loaded && "animate-pulse"
            } bg-gray-300`}
            src={props.image}
            alt={props.title}
            onLoad={() => {
              setLoaded(true);
            }}
          />
        ) : (
          <div
            className="relative h-0 overflow-hidden max-w-full w-full"
            style={{ paddingBottom: "83.25%" }}
          >
            <iframe
              title={props.title}
              src={props.image}
              frameBorder={0}
              allowFullScreen
              className={`absolute ${
                !loaded && "animate-pulse"
              } bg-gray-300 top-0 left-0 w-full h-full`}
              onLoad={() => setLoaded(true)}
            />
          </div>
        )}

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
            className={`${
              copyEffect && "animate-beat"
            } inline-block bg-gray-200 rounded-full px-3 py-1 text-sm 
          font-semibold text-gray-700 mr-2 mb-2 hover:bg-orange-200`}
            onClick={handleCopy}
          >
            <CopyIcon />
          </button>

          {/* Open in new tab button */}
          <Link to={`/posts/${props.date}`}>
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
          </Link>
        </div>

        <div className="px-6 py-2 pb-4">
          <div className="text-black dark:text-white font-bold text-xl mb-2 mt-2 text-left font-sans">
            {props.title} - {props.date}
          </div>
          <p className="text-gray-700  dark:text-white mt-4 text-base text-left font-lighgtfont">
            {body}{" "}
            <button
              className="text-gray-400 dark:text-gray-500 dark:hover:text-gray-300 hover:text-gray-800"
              onClick={() => setShowModal(true)}
            >
              more...
            </button>
          </p>
        </div>
      </div>

      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-50 inset-0 overflow-y-auto"
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <div
            className="flex items-end justify-center min-h-screen
            pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
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
              <div
                className="inline-block align-bottom bg-white rounded-lg 
                text-center overflow-hidden shadow-xl transform transition-all
                sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white dark:bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left font-sans">
                      <Dialog.Title
                        // ref={titleRef}
                        as="h3"
                        className="text-lg leading-5 font-medium text-gray-900 dark:text-white not-sr-only"
                      >
                        {props.title} - {props.date}
                      </Dialog.Title>
                      <div className="mt-2">
                        {props.media_type === "image" ? (
                          <img
                            className={`w-full rounded-t-2xl h-80 object-cover ${
                              !loaded && "animate-pulse"
                            } bg-gray-300`}
                            src={props.image}
                            alt={props.title}
                            onLoad={() => {
                              setLoaded(true);
                            }}
                          />
                        ) : (
                          <div
                            className="relative h-0 overflow-hidden max-w-full w-full"
                            style={{ paddingBottom: "83.25%" }}
                          >
                            <iframe
                              title={props.title}
                              src={props.image}
                              allowFullScreen
                              className={`absolute ${
                                !loaded && "animate-pulse"
                              } bg-gray-300 rounded-t-2xl top-0 left-0 w-full h-full`}
                              onLoad={() => setLoaded(true)}
                            />
                          </div>
                        )}

                        <br />
                        <p className="text-sm text-gray-500 font-lightfont dark:text-white not-sr-only">
                          {props.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-[#00142e] px-4 py-3 sm:px-6 sm:flex sm:flex-row">
                  {/* Modal: Like button */}
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border 
                    border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
                    text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleLike}
                  >
                    <HeartIcon condition={liked} />
                  </button>

                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border 
                    border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
                    text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCopy}
                  >
                    <CopyIcon />
                  </button>

                  {/* Modal: Open in new tab button */}
                  <Link to={`/posts/${props.date}`}>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border 
                    border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
                    text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleLink}
                    >
                      <LinkIcon />
                    </button>
                  </Link>

                  {/* Modal: Close button */}
                  <div className="sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border 
                      
                      border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
                      text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

      {/* Social Share Modal */}

      <Transition.Root show={showSocial} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-50 inset-0 overflow-y-auto"
          open={showSocial}
          onClose={() => setShowSocial(false)}
        >
          <div
            className="flex items-end justify-center min-h-screen
            pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
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
            {/* Centering the modal contents. */}
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
              <div
                className="inline-block align-bottom bg-white rounded-lg 
                text-center overflow-hidden shadow-xl transform transition-all
                sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white dark:bg-slate-900 px-4 pt-5 pb-10 h-52 sm:p-6 sm:pb-4">
                  <h1 className="text-center text-black dark:text-white font-sans text-xl mb-4 mt-2 not-sr-only">
                    Share the post link on these platforms!
                  </h1>
                  <br />
                  <div className="lg:flex sm:justify-around lg:justify-evenly">
                    <FacebookShareButton
                      className="Demo__some-network__share-button"
                      url={`${window.location.protocol}/${window.location.host}/posts/${props.date}`}
                    >
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>

                    <WhatsappShareButton
                      className="Demo__some-network__share-button"
                      url={`${window.location.protocol}/${window.location.host}/posts/${props.date}`}
                    >
                      <WhatsappIcon size={40} round />
                    </WhatsappShareButton>

                    <RedditShareButton
                      className="Demo__some-network__share-button"
                      url={`${window.location.protocol}/${window.location.host}/posts/${props.date}`}
                    >
                      <RedditIcon size={40} round />
                    </RedditShareButton>

                    <LinkedinShareButton
                      className="Demo__some-network__share-button"
                      url={`${window.location.protocol}/${window.location.host}/posts/${props.date}`}
                    >
                      <LinkedinIcon size={40} round />
                    </LinkedinShareButton>

                    <TwitterShareButton
                      className="Demo__some-network__share-button"
                      url={`${window.location.protocol}/${window.location.host}/posts/${props.date}`}
                    >
                      <TwitterIcon size={40} round />
                    </TwitterShareButton>

                    <EmailShareButton
                      className="Demo__some-network__share-button"
                      url={`${window.location.protocol}/${window.location.host}/posts/${props.date}`}
                    >
                      <EmailIcon size={40} round />
                    </EmailShareButton>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row">
                  {/* Modal: Close button */}
                  <div className="sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border 
                      border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium 
                      text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowSocial(false)}
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
