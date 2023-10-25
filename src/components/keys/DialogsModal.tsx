export const DialogCustomed = () => {
  return (
    <>
      <button
        hx-get="/example/modal"
        hx-target="body"
        hx-swap="beforeend"
        class=""
      >
        Open a Modal
      </button>
    </>
  );
};

export const DialogCustomedCalled = () => {
  const style = `
  /***** MODAL DIALOG ****/
#modal {
	/* Underlay covers entire screen. */
	position: fixed;
	top:0px;
	bottom: 0px;
	left:0px;
	right:0px;
	background-color:rgba(0,0,0,0.5);
	z-index:1000;

	/* Flexbox centers the .modal-content vertically and horizontally */
	display:flex;
	flex-direction:column;
	align-items:center;

	/* Animate when opening */
	animation-name: fadeIn;
	animation-duration:150ms;
	animation-timing-function: ease;
}

#modal > .modal-underlay {
	/* underlay takes up the entire viewport. This is only
	required if you want to click to dismiss the popup */
	position: absolute;
	z-index: -1;
	top:0px;
	bottom:0px;
	left: 0px;
	right: 0px;
}

#modal > .modal-content {
	/* Position visible dialog near the top of the window */
	margin-top:10vh;

	/* Sizing for visible dialog */
	width:80%;
	max-width:600px;

	/* Display properties for visible dialog*/
	border:solid 1px #999;
	border-radius:8px;
	box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.3);
	background-color:white;
	padding:20px;

	/* Animate when opening */
	animation-name:zoomIn;
	animation-duration:150ms;
	animation-timing-function: ease;
}

#modal.closing {
	/* Animate when closing */
	animation-name: fadeOut;
	animation-duration:150ms;
	animation-timing-function: ease;
}

#modal.closing > .modal-content {
	/* Animate when closing */
	animation-name: zoomOut;
	animation-duration:150ms;
	animation-timing-function: ease;
}

@keyframes fadeIn {
	0% {opacity: 0;}
	100% {opacity: 1;}
} 

@keyframes fadeOut {
	0% {opacity: 1;}
	100% {opacity: 0;}
} 

@keyframes zoomIn {
	0% {transform: scale(0.9);}
	100% {transform: scale(1);}
} 

@keyframes zoomOut {
	0% {transform: scale(1);}
	100% {transform: scale(0.9);}
} 
  `;

  return (
    <>
      <style>{style}</style>
      <div
        id="modal"
        _="on closeModal add .closing wait for animationend then remove me"
      >
        <div class="modal-underlay" _="on click trigger closeModal"></div>
        <div class="modal-content">
          <h1>Modal Dialog</h1>
          This is the modal content. You can put anything here, like text, or a
          form, or an image.
          <br />
          <br />
          <button _="on click trigger closeModal">Close</button>
        </div>
      </div>
    </>
  );
};

export const DialogInBrowser = () => {
  return (
    <>
      <button
        class="btn"
        hx-post="/example/modal/submit"
        hx-prompt="Enter a string"
        hx-confirm="Are you sure?"
        hx-target="#response"
      >
        Prompt Submission
      </button>
      <div id="response"></div>
    </>
  );
};
