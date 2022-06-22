class VotesController < ApplicationController
    before_action :authorize

    def create
        submission = Submission.find_by(id: params[:submission_id])
        return render json: { error: "Submission not found" }, status: 404 unless submission
        return render json: { error: "Cannot vote on ended battle" }, status: 422 unless submission.battle.is_ended == false

        vote = Vote.find_or_create_by(user_id: params[:user_id], submission_id: params[:submission_id])
        vote.update(score: params[:score])
        if vote.valid?
            render json: vote
        else
            render json: { errors: vote.errors.full_messages }, status: 422
        end
    end

    private

    def vote_params
        params.permit(:user_id, :submission_id, :score)
    end

    def authorize
        unless (session.include? :user_id) && (session[:user_id] == params[:user_id].to_i)
            return render json: { error: "Not authorized" }, status: :unauthorized 
        end
    end
end
