class SubmissionsController < ApplicationController
    before_action :authorize, only: :create

    def show
        submission = Submission.find_by(id: params[:id])
        if submission
            render json: submission
        else
            render json: { error: "Submission not found" }, status: 404
        end
    end

    def create
        submission = Submission.create(submission_params)
        if submission.valid?
            render json: submission, status: :created
        else
            render json: { error: submission.errors.full_messages }, status: 422
        end
    end

    private

    def submission_params
        params.permit(:user_id, :battle_id, :name, :url)
    end

    def authorize
        battle = Battle.find_by(id: params[:battle_id])

        # puts session[:user_id]
        # puts params[:user_id]
        # puts session.include? :user_id
        # puts (session[:user_id] == params[:user_id].to_i)
        # puts (session.include? :user_id) && (session[:user_id] == params[:user_id].to_i)

        unless (session.include? :user_id) && (session[:user_id] == params[:user_id].to_i)
            return render json: { error: "Not authorized" }, status: :unauthorized 
        end
    end
end
