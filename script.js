let capture;
let bodypose;
let poses = [];

// MoveNet keypoint indices:
// 0: nose, 1: left_eye, 2: right_eye, 3: left_ear, 4: right_ear
// 5: left_shoulder, 6: right_shoulder, 7: left_elbow, 8: right_elbow
// 9: left_wrist, 10: right_wrist, 11: left_hip, 12: right_hip
// 13: left_knee, 14: right_knee, 15: left_ankle, 16: right_ankle

const SKELETON_CONNECTIONS = [
  [0, 1], [0, 2], [1, 3], [2, 4],       // Face
  [5, 6],                                 // Shoulders
  [5, 11], [6, 12], [11, 12],            // Torso
  [5, 7], [7, 9],                         // Left arm
  [6, 8], [8, 10],                        // Right arm
  [11, 13], [13, 15],                     // Left leg
  [12, 14], [14, 16]                      // Right leg
];

function setup() {
  createCanvas(800, 600);

  capture = createCapture(VIDEO);
  capture.size(800, 600);
  capture.hide();

  bodypose = ml5.bodyPose(modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded Successfully");
  bodypose.detectStart(capture, gotPoses);
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  translate(width, 0);
  scale(-1, 1);

  image(capture, 0, 0, width, height);

  if (poses.length > 0) {
    let keypoints = poses[0].keypoints;

    // Draw skeleton lines FIRST (behind the dots)
    stroke(0, 255, 0);
    strokeWeight(3);
    noFill();
    for (let [a, b] of SKELETON_CONNECTIONS) {
      let ptA = keypoints[a];
      let ptB = keypoints[b];
      // Only draw if both points are confident enough
      if (ptA.confidence > 0.2 && ptB.confidence > 0.2) {
        line(ptA.x, ptA.y, ptB.x, ptB.y);
      }
    }

    // Draw keypoint dots ON TOP
    noStroke();
    fill(255, 0, 0);
    for (let kp of keypoints) {
      if (kp.confidence > 0.2) {
        ellipse(kp.x, kp.y, 10, 10);
      }
    }
  }
}