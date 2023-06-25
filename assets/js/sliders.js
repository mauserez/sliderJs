const sliderJs = (options) => {
	let sl = {};
	const galleryPhoto = document.querySelector(".projects__gallery-photo");
	const galleryPhotoSm = document.querySelector(".projects__small-gallery");
	const dotsContainer = document.querySelector(".projects__big-slider-dots");
	const projectsButtons = document.querySelector(".projects__buttons");
	const projectText = document.querySelector(".projects__text");
	const projectCity = document.querySelector(".projects__project-city");
	const projectSize = document.querySelector(".projects__project-size");
	const projectRepairTime = document.querySelector(
		".projects__project-repair-time"
	);
	const projectRepaiCost = document.querySelector(
		".projects__project-repair-cost"
	);

	sl.prevBtnBigSlider = document.querySelector(".bg-slider-prev");
	sl.nextBtnBigSlider = document.querySelector(".bg-slider-next");
	sl.options = options;
	sl.currentProject = options[0];
	sl.currentIndex = 0;
	sl.dots = [];
	sl.gallery = [];
	sl.projectsButtons = [];
	sl.options.forEach((element) => {
		sl.gallery.push(element.image);
	});

	sl.setProjectOptions = () => {
		projectText.innerHTML = sl.currentProject.projectOptions.description;
		projectSize.innerHTML = sl.currentProject.projectOptions.size;
		projectCity.innerHTML = sl.currentProject.projectOptions.city;
		projectRepairTime.innerHTML = sl.currentProject.projectOptions.repairTime;
		projectRepaiCost.innerHTML = sl.currentProject.projectOptions.repairCost;
	};

	sl.setGalleryImg = (index) => {
		galleryPhoto.style.backgroundImage = `url(/assets/img/gallery/${sl.gallery[index]})`;
		galleryPhotoSm.style.backgroundImage = `url(/assets/img/gallery/${sl.gallery[index]})`;
	};

	sl.setActiveDot = (idx) => {
		sl.dots.forEach((sib) =>
			sib.classList.remove("projects__big-slider-dot-active")
		);
		sl.dots[idx].classList.add("projects__big-slider-dot-active");
	};

	sl.setActiveProjectButton = (idx) => {
		sl.projectsButtons.forEach((sib) =>
			sib.classList.remove("projects__button-active")
		);
		sl.projectsButtons[idx].classList.add("projects__button-active");
	};

	sl.setActiveProject = (idx = 0) => {
		sl.currentProject = options[idx];
		sl.setProjectOptions();
		sl.setActiveProjectButton(idx);
		sl.setGalleryImg(idx);
		sl.setActiveDot(idx);
		sl.currentIndex = idx;
	};

	sl.prev = () => {
		let idx = sl.currentIndex - 1;
		if (sl.currentIndex === 0) {
			idx = sl.gallery.length - 1;
		}
		sl.setActiveProject(idx);
	};

	sl.next = () => {
		let idx = sl.currentIndex + 1;
		if (sl.currentIndex === sl.gallery.length - 1) {
			idx = 0;
		}
		sl.setActiveProject(idx);
	};

	sl.prevBtnBigSlider.addEventListener("click", () => {
		sl.prev();
	});

	sl.nextBtnBigSlider.addEventListener("click", () => {
		sl.next();
	});

	sl.drawDots = () => {
		dotsContainer.innerHTML = "";
		let dotsHtml = "";

		sl.gallery.forEach((element, index) => {
			let activeDot =
				index === sl.currentIndex ? "projects__big-slider-dot-active" : "";

			dotsHtml += `<div data-idx="${index}" class="projects__big-slider-dot ${activeDot}"></div>`;
		});

		dotsContainer.innerHTML = dotsHtml;

		sl.dots = document.querySelectorAll(".projects__big-slider-dot");
		Array.from(sl.dots).forEach(function (el, idx) {
			el.addEventListener("click", () => {
				sl.setActiveProject(idx);
			});
		});
	};

	sl.drawProjectsButtons = () => {
		let projectsButtonsHtml = "";
		sl.options.forEach((element, idx) => {
			projectsButtonsHtml += `<div
			class="projects__button
			${idx === 0 ? "projects__button-active" : ""}
			">
				${element.projectId}
			</div>`;
			projectsButtons.innerHTML = projectsButtonsHtml;

			sl.projectsButtons = document.querySelectorAll(".projects__button");
			Array.from(sl.projectsButtons).forEach(function (el, idx) {
				el.addEventListener("click", () => {
					sl.setActiveProject(idx);
				});
			});
		});
	};

	sl.drawSmGalleryButtons = () => {
		let hiddenButton = "";

		if (sl.gallery.length === 1) {
			hiddenButton = "hidden";
		}

		let buttonsHtml = `<img class="slider-icon sm-slider-prev prev ${hiddenButton}" alt="Предыдущая картинка"
				 src="/assets/icons/small_slider/prev.svg"/>
				<img class="slider-icon sm-slider-next next ${hiddenButton}" alt="Следующая картинка"
				src="/assets/icons/small_slider/next.svg"/>`;

		galleryPhotoSm.innerHTML = buttonsHtml;
		sl.buttons = document.querySelectorAll(".sm-slider-prev,.sm-slider-next");

		Array.from(sl.buttons).forEach(function (el, idx) {
			if (el.classList.contains("sm-slider-prev")) {
				el.addEventListener("click", () => {
					sl.prev();
				});
			} else {
				el.addEventListener("click", () => {
					sl.next();
				});
			}
		});
	};

	sl.drawDots();
	sl.drawSmGalleryButtons();
	sl.drawProjectsButtons();
	sl.setActiveProject();

	return sl;
};
