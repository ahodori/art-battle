class BattlesController < ApplicationController
    before_action :authorize, only: [:create, :end_battle]

    def index
        battles = Battle.all
        render json: battles, status: :ok
    end

    def show
        battle = Battle.find_by(id: params[:id])
        if battle
            render json: battle, status: :ok, serializer: SingleBattleSerializer
        else
            render json: { error: "Battle not found" }, status: 404
        end
    end

    def create
        battle = Battle.create(battle_params)
        battle.update(is_ended: false)
        if battle.valid?
            render json: battle, status: :created
        else
            render json: { error: battle.errors.full_messages }, status: 422
        end
    end

    def end_battle
        battle = Battle.find_by(id: params[:id])
        puts "ending battle #" + params[:id]
        puts battle
        return render json: { error: "Battle not found" }, status: 404 unless battle
        return render json: { error: "Battle already ended" }, status: 422 unless battle.is_ended == false
        return render json: { error: "Battle needs at least one entrant to end" }, status: 422 unless battle.submissions.length > 0

        all_votes = battle.submissions.map { |submission| submission.votes }
        #pp all_votes
        all_scores = all_votes.map { |vote| vote.pluck(:submission_id, :score)}
        #pp all_scores
        all_avgs = all_scores.map do |votearray|
            scores = votearray.map { |vote| vote.last } #get just score
            avg = scores.sum(0.0) / scores.length
            [votearray[0][0], avg]
        end
        #pp all_avgs
        highest_submission = all_avgs.max { |a, b| a.last <=> b.last}
        #pp highest_submission

        battle.update(winner: highest_submission.first, is_ended: true)
        if battle.valid?
            render json: battle, status: :ok, serializer: SingleBattleSerializer
        else
            render json: { error: "Error ending battle" }, status: 500
        end
    end

    private

    def battle_params
        params.permit(:name, :prompt, :is_ended)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id

        user = User.find_by(id: session[:user_id])

        unless (user) && (user.is_admin)
            return render json: { error: "Not authorized" }, status: :unauthorized 
        end
    end
end
