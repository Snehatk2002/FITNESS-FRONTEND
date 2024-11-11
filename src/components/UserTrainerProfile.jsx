import React from 'react'

const UserTrainerProfile = () => {
  return (
    <div> 
         <div className="container">
    <div className="row">
        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <br></br>
            {/* Details Button */}
            <div className="d-flex justify-content-end mb-4">
                <a href="/viewTrainers" className="btn btn-primary">VIEW DETAILS</a>
            </div>

            <div className="row g-3">
                {/* Card 1 - Trainer Name */}
                <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <div className="card">
                        <img src="alex.jpg" className="card-img-top" alt="Trainer 1" />
                        <div className="card-body">
                            <h5 className="card-title">Alex Johnson</h5>
                            <p className="card-text">Specialist in strength training and fitness coaching.</p>
                        </div>
                    </div>
                </div>

                {/* Card 2 - Trainer Name */}
                <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <div className="card">
                        <img src="lee.jpg" className="card-img-top" alt="Trainer 2" />
                        <div className="card-body">
                            <h5 className="card-title">Samantha Lee</h5>
                            <p className="card-text">Female Trainer Expert in cardio workouts and high-intensity interval training.</p>
                        </div>
                    </div>
                </div>

                {/* Card 3 - Trainer Name */}
                <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <div className="card">
                        <img src="david.jpg" className="card-img-top" alt="Trainer 3" />
                        <div className="card-body">
                            <h5 className="card-title">David Martinez</h5>
                            <p className="card-text">Specialized in yoga, flexibility, and mindfulness training.</p>
                        </div>
                    </div>
                </div>

                {/* Card 4 - Trainer Name */}
                <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <div className="card">
                        <img src="davis.jpg" className="card-img-top" alt="Trainer 4" />
                        <div className="card-body">
                            <h5 className="card-title">Davis Patel</h5>
                            <p className="card-text">Bodybuilding and powerlifting coach with years of experience.</p>
                        </div>
                    </div>
                </div>

                {/* Card 5 - Trainer Name */}
                <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <div className="card">
                        <img src="green.jpg" className="card-img-top" alt="Trainer 5" />
                        <div className="card-body">
                            <h5 className="card-title">Michael Green</h5>
                            <p className="card-text">Specializes in nutrition and weight management plans.</p>
                        </div>
                    </div>
                </div>

                {/* Card 6 - Trainer Name */}
                <div className="col col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <div className="card">
                        <img src="emily.jpg" className="card-img-top" alt="Trainer 6" />
                        <div className="card-body">
                            <h5 className="card-title">Emily Davis</h5>
                            <p className="card-text">CrossFit coach and personal training expert.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  )
}

export default UserTrainerProfile