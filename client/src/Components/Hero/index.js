import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
<div id="banner-wrapper">
					<div id="banner" class="box container">
						<div class="row">
							<div class="col-7 col-12-medium">
								<h2>Hi. This is BoostMe.</h2>
								<p>An app that connects donors with 4H members who are raising livestock projects. By donating to these projects, donors are supporting the 4H mission of providing meaningful opportunities for youth and adults to work together creating sustainable community change.</p>
							</div>
							<div class="col-5 col-12-medium homeButtons">
								<ul>
									<li>
										<Link to='/signup' class="button large icon solid fa-arrow-circle-right">Donate Now!
										</Link>
										</li>
									<li><a href="https://extension.usu.edu/weber/4h/" class="button alt large icon solid fa-question-circle">More info</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
    );
}

export default Hero;