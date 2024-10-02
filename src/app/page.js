"use client";
import { useState, useEffect } from "react";
import allcomments from "./const";
// import qrc from "../../qr.png"

const RechargePage = () => {
  const [simOptions, setSimOptions] = useState([]);
  const [rechargeOptions, setRechargeOptions] = useState([]);
  const [selectedSim, setSelectedSim] = useState("");
  const [selectedRecharge, setSelectedRecharge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [commentCount, setCommentCount] = useState([]);
  const [qrCodeImage, setQrCodeImage] = useState("");
  const [payAmount, setPayAmount] = useState(10);

  useEffect(() => {
    if (localStorage.getItem("comments")) {
      setCommentCount(JSON.parse(localStorage.getItem("comments")));
    }
    fetchSimOptions();
    fetchRechargeOptions();
    fetchComments();
  }, []);

  const fetchSimOptions = async () => {
    const data = [
      { id: "sim1", name: "AIRTEL" },
      { id: "sim2", name: "JIO" },
    ];
    setSimOptions(data);
  };

  const fetchRechargeOptions = async () => {
    const data = [
      {
        id: "recharge1",
        name: "1 month unlimited recharge a @ ₹10/-",
        qrCode: "./IMG_E1921.JPG",
        amout: 10,
      },
      {
        id: "recharge2",
        name: "3 month unlimited recharge a @ ₹20/-",
        qrCode: "./IMG_E1921.JPG",
        amount: 20,
      },
      {
        id: "recharge3",
        name: "6 month unlimited recharge a @ ₹30/-",
        qrCode: "./IMG_E1921.JPG",
        amount: 30,
      },
      {
        id: "recharge4",
        name: "1 year unlimited recharge a @ ₹50/-",
        qrCode: "./IMG_E1921.JPG",
        amount: 50,
      },
    ];
    setRechargeOptions(data);
  };
  const getRandomValues = () => {
    const randomValues = new Set(); // Use a Set to avoid duplicates

    while (randomValues.size < 3) {
      // Generate a random value between 0 and 748
      const randomValue = Math.floor(Math.random() * 749);
      randomValues.add(randomValue);
    }

    // Convert the Set to an Array
    return Array.from(randomValues);
  };

  const fetchComments = async () => {
    // Example usage
    const randomValues = getRandomValues();
    if (!localStorage.getItem("comments")) {
      setCommentCount(randomValues);
      localStorage.setItem("comments", JSON.stringify(randomValues));
    }

    function getFormattedDateMinusMinutes(minutes) {
      const now = new Date();

      // Subtract the specified minutes
      now.setMinutes(now.getMinutes() - minutes);

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutesFormatted = String(now.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutesFormatted}`;
    }
    const data = [
      {
        ...allcomments[randomValues[0]],
        time: getFormattedDateMinusMinutes(randomValues[0]),
      },
      {
        ...allcomments[randomValues[1]],
        time: getFormattedDateMinusMinutes(randomValues[1]),
      },
      {
        ...allcomments[randomValues[2]],
        time: getFormattedDateMinusMinutes(randomValues[2]),
      },
    ];

    setComments(data);
  };

  const handleRecharge = () => {
    const regex = /d{10}$/;
    if (!selectedSim || !selectedRecharge || !phoneNumber || regex.test(phoneNumber)) {
      //   alert("Please fill out all the fields before proceeding.");
      return;
    }

    // Start the progress bar and display step-by-step messages
    setIsProcessing(true);
    setProgress(0);
    setShowQRCode(false);
    setQrCodeImage("");
    let steps = [
      { percent: 15, message: "Getting your info..." },
      { percent: 40, message: "Getting SIM details..." },
      { percent: 65, message: "Generating QR code..." },
      { percent: 90, message: "Pay and get recharge..." },
      { percent: 100, message: "Pay and get recharge..." },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setProgress(step.percent);
        setProgressMessage(step.message);
        if (step.percent === 100) {
          // When progress reaches 100%, show the QR code
          const selectedRechargeOption = rechargeOptions.find(
            (option) => option.id === selectedRecharge
          );
          setPayAmount(selectedRechargeOption?.amount||10)
          setQrCodeImage(selectedRechargeOption?.qrCode || "");
          setShowQRCode(true);
          setIsProcessing(false);
        }
      }, 1000 * (index + 1)); // Simulate delay for each step
    });
  };

  const handleCommentSubmit = () => {
    const newCommentData = {
      id: comments.length + 1,
      name: commenterName,
      text: newComment,
      time: new Date().toLocaleString(),
    };
    setComments([...comments, newCommentData]);
    let x = commentCount;
    let y = [x[0] + 1, ...x];
    setCommentCount(y);
    localStorage.setItem("comments", JSON.stringify(y));
    setNewComment("");
    setCommenterName("");
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Banner */}
      <div className="bg-blue-500 text-white text-center py-4 rounded-lg">
        <h1 className="text-2xl font-bold">
          🔥 Navratri Offer! 95% Off on All Recharges 🔥
        </h1>
        <p>Hurry up, the offer ends soon!</p>
      </div>

      {/* Conditional Rendering for Form or QR Code */}
      {!showQRCode ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recharge Your Mobile</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Select SIM */}
            <div>
              <label
                htmlFor="sim"
                className="block text-sm font-medium text-gray-700"
              >
                Select SIM
              </label>
              <select
                id="sim"
                value={selectedSim}
                onChange={(e) => setSelectedSim(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select your SIM</option>
                {simOptions.map((sim) => (
                  <option key={sim.id} value={sim.id}>
                    {sim.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Recharge */}
            <div>
              <label
                htmlFor="recharge"
                className="block text-sm font-medium text-gray-700"
              >
                Select Recharge
              </label>
              <select
                id="recharge"
                value={selectedRecharge}
                onChange={(e) => setSelectedRecharge(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Choose a Recharge</option>
                {rechargeOptions.map((recharge) => (
                  <option key={recharge.id} value={recharge.id}>
                    {recharge.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleRecharge}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay and Recharge"}
            </button>
          </form>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mt-4">
              <p className="text-center mb-2">{progressMessage}</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <p className="text-xl font-semibold mb-4">
            Scan and Pay {payAmount} using any UPI app
          </p>
          {qrCodeImage && (
            <img
                src="/qr.png"//{qrCodeImage} // Displays the selected recharge's QR code image
              alt="UPI QR Code"
              className="w-64 h-64"
            />
          )}
        </div>
      )}

      {/* Comment Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Comments({commentCount[0]})
        </h2>

        {/* Display Comments */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 py-2">
              <p className="font-semibold">{comment.name}</p>
              <p className="text-gray-500 text-sm">{comment.time}</p>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="mt-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={commenterName}
            onChange={(e) => setCommenterName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your name"
          />

          <label
            htmlFor="newComment"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Add a Comment
          </label>
          <textarea
            id="newComment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            rows="3"
            placeholder="Write your comment..."
          ></textarea>

          <button
            onClick={handleCommentSubmit}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RechargePage;
