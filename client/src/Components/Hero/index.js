import React from 'react';
import { Link } from 'react-router-dom';
 
function Hero() {
    return (
<div id="banner-wrapper">
					<div id="banner" class="box container">
						<div class="row">
							<div class="col-7 col-12-medium">
								<h2>Hi. This is BoostMe.</h2>
								<p>We are a 4H donation app that encourages members to support 4H members on their projects.</p>
							</div>
							<div class="col-5 col-12-medium">
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