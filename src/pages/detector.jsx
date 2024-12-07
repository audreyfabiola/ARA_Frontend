import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import images from '../constants/images';
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react';
import DiffusionBar from '../diffusionBar';

function Detector() {

    const slideIn = useSpring({
        config: {
            tension: 170,
            friction: 60
        },
        from: { y: -50, opacity: 0 },
        to: { y: 0, opacity: 1 },
    })

    const slideIn2 = useSpring({
        config: {
            tension: 170,
            friction: 60
        },
        from: { y: -50, opacity: 0 },
        delay: 250,
        to: { y: 0, opacity: 1 },
    })

    const fadeIn= useSpring({ 
        config: {
          duration: 1200,
        },
        from: { opacity: 0 },
        to: { opacity: 1 },
    })

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        if (fileUploaded) {
            setPreviewURL(URL.createObjectURL(fileUploaded));
            setLoading(true); 
            setTimeout(() => setLoading(false), 2000);
        }
    };

    const diffusionResults = [
      { model: "DALL-E", diffusionPercentage: 93 },
      { model: "Midjourney", diffusionPercentage: 17 },
      { model: "Stable Diffusion", diffusionPercentage: 0 },
      { model: "FLUX", diffusionPercentage: 0 },
    ];
  
    
  
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [UID, setUID] = useState('109301930');
    const [AuthenticationDate, setAuthenticationDate] = useState('18 Nov 2024');
    const [loading, setLoading] = useState(false);
    const hiddenFileInput = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null); 
    const [previewURL, setPreviewURL] = useState(null); 

  return (
    <div className='min-h-screen w-full bg-cream pb-12'>
      <div classname='fixed'>
        <div className='flex items-center h-20 bg-pink'>
          <div className='hidden md:flex'>
            <button className='w-fit px-8 ml-12 h-full bg-pink hover:bg-pink-100'
              onClick={() => navigate('/')}>
              <p className='font-inter text-xl'>
                      Home
              </p>    
            </button>
                
            <button className='w-fit px-8 h-full bg-pink hover:bg-pink-100'
            onClick={() => navigate('/detector')}>
                <p className='font-inter text-xl'>
                    AI Art Detector
                </p>
            </button>

            <button className='w-fit px-8 h-full bg-pink hover:bg-pink-100'
            onClick={() => navigate('/database')}>
                <p className='font-inter text-xl'>
                    Image Database
                </p>
            </button>
          </div>
                
                <div className='ml-20 md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {/* hamburger icon */}
                        <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 6h16M4 12h16M4 18h16'
                        />
                        </svg>
                    </button>
                </div>

                <img 
                className='ml-auto mr-8 h-20 w-20'
                src={images.aralogo} alt='aralogo'
                style={{ objectFit: 'contain'}} 
                />
            </div>

            {/* Modal */}
      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
          onClick={() => setIsOpen(false)}
        >
          <div
            className='bg-white rounded-lg w-3/4 max-w-sm'
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <div className='flex justify-end p-2'>
              <button onClick={() => setIsOpen(false)}>
                <svg
                  className='w-6 h-6 text-gray-700'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className='flex flex-col items-center p-4'>

                <button
                    className='w-full py-2 text-center text-xl font-inter hover:bg-gray-200'
                    onClick={() => {
                    navigate('/');
                    setIsOpen(false);
                    }}
                >
                    Home
                </button>

              <button
                className='w-full py-2 text-center text-xl font-inter hover:bg-gray-200'
                onClick={() => {
                  navigate('/detector');
                  setIsOpen(false);
                }}
              >
                AI Art Detector
              </button>

              <button
                className='w-full py-2 text-center text-xl font-inter hover:bg-gray-200'
                onClick={() => {
                  navigate('/database');
                  setIsOpen(false);
                }}
              >
                Image Database
              </button>
            </div>
          </div>
        </div>
      )}

        </div>

        <div className='flex mt-10'>

            <div className='ml-20 mr-10 flex flex-col w-full'>
                <animated.p
                    className="flex-wrap text-6xl font-inter font-extrabold text-blue-100"
                    style={{ ...slideIn }}
                    >
                    AI-generated artwork detector
                </animated.p>

                <animated.div
                    className="mt-20 mb-12 flex rounded-[1.5rem] bg-blue-300 h-fit w-[32rem] p-8 shadow-md"
                    style={{ ...fadeIn }}
                    >
                    {previewURL ? (
                        <div className="flex">
                            <img
                                src={previewURL}
                                alt="Uploaded Preview"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>
                    ) : (
                <>    
                    <animated.div
                        className="flex flex-col items-center justify-center w-[28rem] h-[25rem] bg-white rounded-xl shadow-sm border-dotted border-4 border-blue-300"
                        style={{ ...fadeIn }}
                    >
                    <img
                    className='opacity-20 h-30 w-45 justify-center'
                    src={images.monalisa} alt='monalisa'
                    style={{ objectFit: 'contain'}}
                    />
                        <div className="absolute flex flex-col items-center text-center">
                        <label htmlFor="button-upload" className="cursor-pointer">
                            <button
                            className="h-20 w-20 flex items-center justify-center rounded-full shadow-mdfocus:outline-none"
                            style={{ objectFit: "contain" }}
                            onClick={handleClick}
                            >
                            <img
                                className="h-15 w-15"
                                src={images.upload}
                                alt="upload"
                                style={{ objectFit: "contain" }}
                            /> 
                            </button>
                            </label>
                            <input
                                type="file"
                                id="button-upload"
                                onChange={handleChange}
                                ref={hiddenFileInput}
                                style={{display: 'none'}} // Make the file input element invisible
                            />
                            <p className="text-lg font-medium text-gray-700 mt-4">
                                Drag & drop files or{' '}
                                <span className="text-purple cursor-pointer hover:underline">
                                Browse
                                </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Supported formats: JPEG, PNG, JPG
                            </p>
                        </div>
                    
                    </animated.div>
                    </>
                    )}
                    </animated.div>
            </div>

            <div className='mr-20 ml-10 flex flex-col items-center w-full'>
                <animated.div
                    className="min-h-[6rem] w-full bg-blue-200 rounded-xl shadow-sm flex flex-col items-center justify-center"
                    style={{ ...fadeIn }}
                    >

                    <div className="w-full bg-blue-200 rounded-t-xl p-2">
                        <animated.p
                        className="pl-3 mr-auto text-xl font-inter font-semibold text-gray-800"
                        style={{ ...fadeIn }}
                        >
                        Result
                        </animated.p>
                    </div>

                    <div className="relative flex flex-row items-center justify-between w-full bg-blue-300 px-6 py-4 rounded-b-xl shadow-inner">
                        {loading ? (
                                // <div className='flex justify-center items-center'>
                                    <div className="mx-auto w-10 h-10 border-4 border-gray-300 border-t-purple rounded-full animate-spin"></div>
                                // </div>
                        ) : (
                        <>
                            <p className="text-lg font-bold text-black">
                            The image is: <span className="text-blue-400">Likely AI-generated</span>
                            </p>

                            <div className="flex items-center justify-center w-16 h-16 bg-blue-400 text-white font-bold text-lg rounded-[1.5rem]">
                            100%
                            </div>
                        </>
                        
                        )}
                    </div>
{/* 
                    <p className="text-lg font-bold text-black">
                            The image is: <span className="text-green-100">Not likely to be AI-generated</span>
                            </p>

                            <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-white font-bold text-lg rounded-[1.5rem]">
                            1%
                            </div>
                             */}
                             
                </animated.div>

                <animated.div
                    className="h-full mt-[3.0rem] w-full bg-blue-200 rounded-xl shadow-sm flex flex-col items-center justify-center"
                    style={{ ...fadeIn }}
                    >

                    <div className="w-full bg-blue-200 rounded-t-xl p-2">
                        <animated.p
                        className="pl-3 mr-auto text-xl font-inter font-semibold text-gray-800"
                        style={{ ...fadeIn }}
                        >
                        Diffusion
                        </animated.p>

                    </div>

                    <div className="h-full relative flex flex-col items-center justify-center w-full bg-blue-300 px-6 py-4 rounded-b-xl shadow-inner">
                    
                    {loading ? (
                      <div className="w-10 h-10 border-4 border-gray-300 border-t-purple rounded-full animate-spin"></div>
                    ) : (
                      
                      <div className="flex flex-col space-y-6 w-full max-w-md">

                        {diffusionResults.map((result, index) => (
                                        <DiffusionBar
                                          key={index}
                                          modelName={result.model}
                                          diffusionPercentage={result.diffusionPercentage}
                                        />
                                      ))}

{/* 
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xl font-semibold w-2/5 overflow-hidden">DALL-E</span>
                          <div className="flex items-center w-3/4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                              <div
                                className="h-2.5 rounded-full"
                                style={{
                                  width: '45%',
                                  background: 'linear-gradient(to left, red, green)',
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              45%
                            </span>
                          </div>
                        </div>
                        

                        <div className="flex items-center justify-between w-full">
                          <span className="text-xl font-semibold w-2/5 overflow-hidden">Midjourney</span>
                          <div className="flex items-center w-3/4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                              <div
                                className="h-2.5 rounded-full"
                                style={{
                                  width: '45%',
                                  background: 'linear-gradient(to left, red, green)',
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              45%
                            </span>
                          </div>
                        </div>


                        <div className="flex items-center justify-between w-full">
                          <span className="text-xl font-semibold w-2/5 overflow-hidden">Stable Diffusion</span>
                          <div className="flex items-center w-3/4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                              <div
                                className="h-2.5 rounded-full"
                                style={{
                                  width: '45%',
                                  background: 'linear-gradient(to left, red, green)',
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              45%
                            </span>
                          </div>
                        </div>



                        <div className="flex items-center justify-between w-full">
                          <span className="text-xl font-semibold w-2/5 overflow-hidden">FLUX</span>
                          <div className="flex items-center w-3/4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                              <div
                                className="h-2.5 rounded-full"
                                style={{
                                  width: '45%',
                                  background: 'linear-gradient(to left, red, green)',
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              45%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full">
                          <span className="text-xl font-semibold w-2/5 overflow-hidden">DALL-E</span>
                          <div className="flex items-center w-3/4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                              <div
                                className="h-2.5 rounded-full"
                                style={{
                                  width: '45%',
                                  background: 'linear-gradient(to left, red, green)',
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              45%
                            </span>
                          </div>
                        </div> */}

                      </div>
                    )}
                  </div>
                </animated.div>
            </div>
        </div>
        
    </div>
  )
}

export default Detector