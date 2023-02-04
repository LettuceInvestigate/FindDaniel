<?php

	$inData = getRequestInfo();
	
	$UserID = $inData["UserID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        // Gets the total number of contacts from specified user
		$stmt = $conn->prepare("Select COUNT(*) from Contacts where UserID=?");
		$stmt->bind_param("s", $UserID );
		$stmt->execute();
		$numContacts = $stmt->get_result();

		// Gets number of dead contacts from specified user
        $stmt = $conn->prepare("Select COUNT(*) from Contacts where UserID=? AND Alive='Dead'")
		$stmt->bind_param("s", $UserID );
		$stmt->execute();
		$numSuspects = $stmt->get_result();

        // Gets number of dead contacts from specified user
        $stmt = $conn->prepare("Select COUNT(*) from Contacts where UserID=? AND Alive='Alive'")
		$stmt->bind_param("s", $UserID );
		$stmt->execute();
		$numAlive = $stmt->get_result();
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $numContacts, $numDead, $numAlive )
	{
		$retValue = '{"numContacts":[' . $numContacts . '], "numContacts":[' . $numDead . '],"numAlive":[' . $numAlive . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>