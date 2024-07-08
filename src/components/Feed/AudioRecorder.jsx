import React, { useState, useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";
import CancelIcon from "@mui/icons-material/Cancel";

import "./AudioRecorder.css";
const AudioRecorder = ({ updateAudioBlobRef, audioBlobRef }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null); // 1)use Ref change value without reRendering many time
  //2) Dom se connect hokar uske  attribute se bhi data collect kar skta hai
  const audioChunksRef = useRef([]);

  const handleAudioRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          setAudioBlob(audioBlob);
          updateAudioBlobRef(audioBlob);
          audioChunksRef.current = [];
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const RemoveAudioData = () => {
    setAudioBlob(null);
    updateAudioBlobRef(null);
  };

  return (
    <div
      className="recording-button d-flex align-items-center justify-content-end me-3"
      id={`${isRecording ? "recording-button-id" : ""}`}
    >
      {audioBlob && audioBlobRef ? (
        <CancelIcon
          fontSize="large"
          onClick={RemoveAudioData}
          style={{ cursor: "pointer", marginRight: "4px" }}
        />
      ) : (
        <MicIcon
          fontSize="large"
          onClick={handleAudioRecording}
          style={{ cursor: "pointer" }}
        />
      )}
      {(audioBlob && audioBlobRef) && (
        <audio controls src={URL.createObjectURL(audioBlob)} />
      )}
    </div>
  );
};

export default AudioRecorder;
