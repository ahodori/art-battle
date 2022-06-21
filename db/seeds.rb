# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all
Battle.destroy_all
Vote.destroy_all
Submission.destroy_all

u1 = User.create(username: "albert", password: "123", password_confirmation: "123", is_admin: true)
u2 = User.create(username: "bobert", password: "1234", password_confirmation: "1234")

b1 = Battle.create(name: "battle 1", prompt: "prompt 1", is_ended: false)
b2 = Battle.create(name: "battle 2", prompt: "prompt 2", is_ended: false)

s1 = Submission.create(name: "my first song", url: "a", user_id: u1.id, battle_id: b1.id)
s2 = Submission.create(name: "other song", url: "b", user_id: u2.id, battle_id: b1.id)

v1 = Vote.create(submission_id: s1.id, user_id: u1.id, score: 10)
v2 = Vote.create(submission_id: s1.id, user_id: u2.id, score: 8)
v3 = Vote.create(submission_id: s2.id, user_id: u1.id, score: 1)

puts "Finished seeding"